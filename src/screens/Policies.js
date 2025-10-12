import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Pressable,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backButton from '../../assets/images/arrow-back.png';
import {
  getPrivacyPolicy,
  getReturnPolicy,
  getTermsAndConditions,
  updatePrivacyPolicy,
  updateReturnPolicy,
  updateTermsAndConditions,
} from '../store/api';

const Policies = ({ navigation }) => {
  // Hooks declared at the top level, unconditionally
  const [expandedSections, setExpandedSections] = useState({});
  const [policySections, setPolicySections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPolicyTitle, setNewPolicyTitle] = useState('');
  const [newPolicyContent, setNewPolicyContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const textInputRef = useRef(null);

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  // Fetch policies
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const [returnData, termsData, privacyData] = await Promise.all([
          getReturnPolicy(),
          getTermsAndConditions(),
          getPrivacyPolicy(),
        ]);

        setPolicySections([
          {
            title: 'Return Policy',
            content: returnData?.return_policy || 'No return policy available.',
          },
          {
            title: 'Terms and Conditions',
            content:
              termsData?.terms_condition ||
              'No terms and conditions available.',
          },
          {
            title: 'Privacy Policy',
            content:
              privacyData?.privacy_policy || 'No privacy policy available.',
          },
        ]);
      } catch (error) {
        console.error('Error fetching policies:', error);
        Alert.alert('Error', 'Failed to fetch policy details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Toggle expand/collapse
  const toggleSection = title => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Insert formatting at cursor position
  const insertFormatting = formatType => {
    const { start, end } = selection;
    const text = newPolicyContent || '';
    let insertText = '';
    let cursorOffset = 0;

    switch (formatType) {
      case 'bold':
        insertText = '**text**';
        cursorOffset = 2;
        break;
      case 'italic':
        insertText = '*text*';
        cursorOffset = 1;
        break;
      case 'bullet':
        insertText = '- ';
        cursorOffset = 2;
        break;
      case 'h1':
        insertText = '# ';
        cursorOffset = 2;
        break;
      case 'h2':
        insertText = '## ';
        cursorOffset = 3;
        break;
      case 'h3':
        insertText = '### ';
        cursorOffset = 4;
        break;
      default:
        return;
    }

    const newText = text.slice(0, start) + insertText + text.slice(end);
    setNewPolicyContent(newText);
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
        textInputRef.current.setNativeProps({
          selection: {
            start: start + cursorOffset,
            end: start + cursorOffset + 4,
          },
        });
      }
    }, 0);
  };

  // Parse markdown for display
  const renderPolicyContent = content => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      let style = styles.contentText;
      let text = line;

      if (line.startsWith('# ')) {
        style = styles.heading1;
        text = line.replace(/^# /, '');
      } else if (line.startsWith('## ')) {
        style = styles.heading2;
        text = line.replace(/^## /, '');
      } else if (line.startsWith('### ')) {
        style = styles.heading3;
        text = line.replace(/^### /, '');
      } else if (line.startsWith('- ')) {
        style = styles.bullet;
        text = `• ${line.replace(/^- /, '')}`;
      } else if (line.match(/\*\*.*?\*\*/)) {
        text = line.replace(/\*\*(.*?)\*\*/g, '$1');
        style = { ...style, fontWeight: 'bold' };
      } else if (line.match(/\*.*?\*/)) {
        text = line.replace(/\*(.*?)\*/g, '$1');
        style = { ...style, fontStyle: 'italic' };
      }

      return (
        <Text key={index} style={style}>
          {text}
        </Text>
      );
    });
  };

  // Edit
  const handleEdit = index => {
    setNewPolicyTitle(policySections[index].title);
    setNewPolicyContent(policySections[index].content);
    setEditIndex(index);
    setModalVisible(true);
  };

  // Save / Update to API
  const handleAddOrEditPolicy = async () => {
    if (newPolicyTitle.trim() === '' || newPolicyContent.trim() === '') {
      Alert.alert('Validation', 'Please fill out both fields.');
      return;
    }

    try {
      setLoading(true);
      const title = newPolicyTitle.toLowerCase();

      if (title.includes('return')) {
        await updateReturnPolicy(newPolicyContent);
      } else if (title.includes('terms')) {
        await updateTermsAndConditions(newPolicyContent);
      } else if (title.includes('privacy')) {
        await updatePrivacyPolicy(newPolicyContent);
      }

      const updated = [...policySections];
      updated[editIndex] = {
        title: newPolicyTitle,
        content: newPolicyContent,
      };
      setPolicySections(updated);
      Alert.alert('Success', `${newPolicyTitle} updated successfully.`);
    } catch (error) {
      console.error('Error updating policy:', error);
      Alert.alert('Error', error.message || 'Failed to update policy.');
    } finally {
      setLoading(false);
      setEditIndex(null);
      setNewPolicyTitle('');
      setNewPolicyContent('');
      setModalVisible(false);
    }
  };

  // Delete
  const handleDeletePopup = index => {
    Alert.alert(
      'Delete Policy',
      'Are you sure you want to delete this policy?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const updated = policySections.filter((_, i) => i !== index);
            setPolicySections(updated);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Image source={backButton} style={{ height: 20, width: 20 }} />
        </Pressable>

        <Text style={styles.headerTitle}>Policies</Text>

        <TouchableOpacity
          style={styles.addPolicyBtn}
          onPress={() => {
            setEditIndex(null);
            setNewPolicyTitle('');
            setNewPolicyContent('');
            setModalVisible(true);
          }}
        >
          <Text style={styles.addPolicyBtnText}>+ Add Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#1BB83A" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 8 }}>
          <View style={styles.section}>
            {policySections.map((section, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.title)}
                >
                  <Text style={styles.sectionHeaderText}>{section.title}</Text>
                  <Text>{expandedSections[section.title] ? '-' : '+'}</Text>
                </TouchableOpacity>

                {expandedSections[section.title] && (
                  <View style={styles.sectionContent}>
                    {renderPolicyContent(section.content)}

                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => handleEdit(index)}
                      >
                        <Text style={styles.editBtnText}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.actionBtn,
                          { backgroundColor: '#F44336' },
                        ]}
                        onPress={() => handleDeletePopup(index)}
                      >
                        <Text style={styles.actionBtnText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Policy' : 'Add New Policy'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Policy Title"
              placeholderTextColor="gray"
              value={newPolicyTitle}
              onChangeText={setNewPolicyTitle}
            />

            <View style={styles.formattingToolbar}>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('bold')}
              >
                <Text style={styles.formatButtonText}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('italic')}
              >
                <Text
                  style={[styles.formatButtonText, { fontStyle: 'italic' }]}
                >
                  I
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('bullet')}
              >
                <Text style={styles.formatButtonText}>•</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('h1')}
              >
                <Text style={styles.formatButtonText}>H1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('h2')}
              >
                <Text style={styles.formatButtonText}>H2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('h3')}
              >
                <Text style={styles.formatButtonText}>H3</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              ref={textInputRef}
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Policy Description (use **bold**, *italic*, - bullet, # heading)"
              placeholderTextColor="gray"
              value={newPolicyContent}
              onChangeText={setNewPolicyContent}
              onSelectionChange={({ nativeEvent: { selection } }) =>
                setSelection(selection)
              }
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setEditIndex(null);
                  setNewPolicyTitle('');
                  setNewPolicyContent('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddOrEditPolicy}
              >
                <Text style={styles.saveBtnText}>
                  {editIndex !== null ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Policies;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#E6F0EC',
  },
  goBackButton: { padding: 5, width: 100 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  addPolicyBtn: {
    backgroundColor: '#1BB83A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addPolicyBtnText: { color: '#fff', fontWeight: '600' },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#DDECE5',
    borderRadius: 6,
    marginBottom: 4,
  },
  sectionHeaderText: { fontSize: 16, fontWeight: '500' },
  sectionContent: {
    padding: 10,
    backgroundColor: '#F0F8F5',
    borderRadius: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  contentText: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  heading3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  bullet: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  editBtnText: { color: 'black', fontWeight: '600' },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  actionBtnText: { color: '#fff', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    minHeight: 100,
  },
  formattingToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formatButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  formatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  cancelBtnText: { color: '#333', fontWeight: '500' },
  saveBtn: {
    backgroundColor: '#1BB83A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  saveBtnText: { color: '#fff', fontWeight: '600' },
});
