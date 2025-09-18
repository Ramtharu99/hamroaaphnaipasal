import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backButton from "../../assets/images/arrow-back.png"

const Policies = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [policySections, setPolicySections] = useState([
    {
      title: 'Return Policy',
      content: 'You can return any product within 30 days of purchase.',
    },
    {
      title: 'Terms and Conditions',
      content: 'By using our service, you agree to our terms and conditions.',
    },
    {
      title: 'Privacy Policy',
      content: 'We respect your privacy and protect your personal information.',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPolicyTitle, setNewPolicyTitle] = useState('');
  const [newPolicyContent, setNewPolicyContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleAddOrEditPolicy = () => {
    if (newPolicyTitle.trim() === '' || newPolicyContent.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...policySections];
      updated[editIndex] = {
        title: newPolicyTitle,
        content: newPolicyContent,
      };
      setPolicySections(updated);
      setEditIndex(null);
    } else {
      const newPolicy = {
        title: newPolicyTitle,
        content: newPolicyContent,
      };
      setPolicySections([...policySections, newPolicy]);
    }

    setNewPolicyTitle('');
    setNewPolicyContent('');
    setModalVisible(false);
  };

  const handleEdit = (index) => {
    setNewPolicyTitle(policySections[index].title);
    setNewPolicyContent(policySections[index].content);
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const updated = policySections.filter((_, i) => i !== index);
    setPolicySections(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back + Title + Add Button */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Image source={backButton} style={{height: 20, width: 20}} />
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

      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {/* Policies Section */}
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
                  <Text style={{ marginBottom: 8 }}>{section.content}</Text>

                  {/* Action buttons */}
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleEdit(index)}
                    >
                      <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#F44336' }]}
                      onPress={() => handleDelete(index)}
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

      {/* Add/Edit Policy Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
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

            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Policy Description"
              placeholderTextColor="gray"
              value={newPolicyContent}
              onChangeText={setNewPolicyContent}
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
    marginTop: 8
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
    backgroundColor: 'transparent',
  },
  editBtnText: { color: 'black', fontWeight: '600' },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
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

export default Policies;
