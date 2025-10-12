import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  BackHandler,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable, Button } from 'react-native-paper';
import backButton from '../../assets/images/arrow-back.png';
import {
  getSocialLinks,
  updateSocialLinks,
  getFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
} from '../store/api';

const socialIcons = {
  Facebook: require('../../assets/images/facebook.png'),
  Instagram: require('../../assets/images/instagram.png'),
  YouTube: require('../../assets/images/youtube.png'),
  WhatsApp: require('../../assets/images/whatsapp.png'),
  TikTok: require('../../assets/images/tik-tok.png'),
  Pinterest: require('../../assets/images/pinterest.png'),
};

const initialSocialData = [
  {
    title: 'Facebook',
    value: '',
    icon: socialIcons.Facebook,
    apiKey: 'facebook_link',
  },
  {
    title: 'Instagram',
    value: '',
    icon: socialIcons.Instagram,
    apiKey: 'insta_link',
  },
  {
    title: 'YouTube',
    value: '',
    icon: socialIcons.YouTube,
    apiKey: 'youtube_link',
  },
  {
    title: 'WhatsApp',
    value: '',
    icon: socialIcons.WhatsApp,
    apiKey: 'whatsapp',
  },
  {
    title: 'TikTok',
    value: '',
    icon: socialIcons.TikTok,
    apiKey: 'tiktok_link',
  },
  {
    title: 'Pinterest',
    value: '',
    icon: socialIcons.Pinterest,
    apiKey: 'pininterest_link',
  },
];

const MarketingAndSocial = ({ navigation }) => {
  const [socialData, setSocialData] = useState(initialSocialData);
  const [faqData, setFaqData] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });
  const [expandedSections, setExpandedSections] = useState({
    social: false,
    faq: false,
  });
  const [loading, setLoading] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [editSocial, setEditSocial] = useState({
    index: null,
    title: '',
    value: '',
    apiKey: '',
  });
  const [faqModalVisible, setFaqModalVisible] = useState(false);
  const [editFAQ, setEditFAQ] = useState({
    id: null,
    question: '',
    answer: '',
  });

  // Fetch social links and FAQs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const socialLinks = await getSocialLinks();
        const updatedSocialData = initialSocialData.map(item => ({
          ...item,
          value: socialLinks[item.apiKey] || item.value,
        }));
        setSocialData(updatedSocialData);

        const faqs = await getFAQs();
        console.log('Fetched FAQs:', faqs); 
        setFaqData(faqs.faqs || []);
      } catch (error) {
        console.error('Fetch data error:', error);
        Alert.alert('Error', error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  // Toggle section
  const toggleSection = section => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Open social media edit modal
  const handleEditSocial = index => {
    const item = socialData[index];
    setEditSocial({
      index,
      title: item.title,
      value: item.value,
      apiKey: item.apiKey,
    });
    setSocialModalVisible(true);
  };

  // Update social media link
  const handleUpdateSocial = async () => {
    if (!editSocial.value.trim()) {
      Alert.alert('Validation', 'Please enter a valid URL.');
      return;
    }

    const newData = [...socialData];
    newData[editSocial.index].value = editSocial.value;
    setSocialData(newData);

    const socialLinksData = {};
    newData.forEach(item => {
      socialLinksData[item.apiKey] = item.value;
    });

    try {
      setLoading(true);
      await updateSocialLinks(socialLinksData);
      Alert.alert('Success', 'Social link updated successfully');
      setSocialModalVisible(false);
      setEditSocial({ index: null, title: '', value: '', apiKey: '' });
    } catch (error) {
      console.error('Update social link error:', error);
      Alert.alert('Error', error.message || 'Failed to update social link');
    } finally {
      setLoading(false);
    }
  };

  // Save all social media links
  const handleSaveSocialLinks = async () => {
    const hasData = socialData.some(item => item.value.trim() !== '');
    if (!hasData) {
      Alert.alert('Validation', 'Please enter at least one social media link.');
      return;
    }

    const socialLinksData = {};
    socialData.forEach(item => {
      socialLinksData[item.apiKey] = item.value;
    });

    try {
      setLoading(true);
      await updateSocialLinks(socialLinksData);
      Alert.alert('Success', 'Social links saved successfully');
    } catch (error) {
      console.error('Save social links error:', error);
      Alert.alert('Error', error.message || 'Failed to save social links');
    } finally {
      setLoading(false);
    }
  };

  // Delete social media link
  const handleDeleteSocial = async index => {
    const newData = [...socialData];
    newData[index].value = '';
    setSocialData(newData);

    const socialLinksData = {};
    newData.forEach(item => {
      socialLinksData[item.apiKey] = item.value;
    });

    try {
      setLoading(true);
      await updateSocialLinks(socialLinksData);
      Alert.alert('Success', 'Social link deleted successfully');
    } catch (error) {
      console.error('Delete social link error:', error);
      Alert.alert('Error', error.message || 'Failed to delete social link');
    } finally {
      setLoading(false);
    }
  };

  // Add FAQ
  const addFAQHandler = async () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) {
      Alert.alert('Validation', 'Please fill out both question and answer.');
      return;
    }

    try {
      setLoading(true);
      const result = await addFAQ({
        question: newFAQ.question,
        answer: newFAQ.answer,
      });
      setFaqData([...faqData, result.data]);
      setNewFAQ({ question: '', answer: '' });
      Alert.alert('Success', result.message || 'FAQ added successfully');
    } catch (error) {
      console.error('Add FAQ error:', error);
      Alert.alert('Error', error.message || 'Failed to add FAQ');
    } finally {
      setLoading(false);
    }
  };

  // Edit FAQ
  const handleEditFAQ = faq => {
    setEditFAQ({ id: faq.id, question: faq.question, answer: faq.answer });
    setFaqModalVisible(true);
  };

  // Update FAQ
  const handleUpdateFAQ = async () => {
    if (!editFAQ.question.trim() || !editFAQ.answer.trim()) {
      Alert.alert('Validation', 'Please fill out both question and answer.');
      return;
    }

    try {
      setLoading(true);
      const result = await updateFAQ(editFAQ.id, {
        question: editFAQ.question,
        answer: editFAQ.answer,
      });
      setFaqData(
        faqData.map(item =>
          item.id === editFAQ.id
            ? {
                ...item,
                question: editFAQ.question,
                answer: editFAQ.answer,
                updated_at: new Date().toISOString(),
              }
            : item,
        ),
      );
      setFaqModalVisible(false);
      setEditFAQ({ id: null, question: '', answer: '' });
      Alert.alert('Success', result.message || 'FAQ updated successfully');
    } catch (error) {
      console.error('Update FAQ error:', error);
      Alert.alert('Error', error.message || 'Failed to update FAQ');
    } finally {
      setLoading(false);
    }
  };

  // Delete FAQ
  const deleteFAQ = async id => {
    if (!id) {
      Alert.alert('Error', 'Invalid FAQ ID');
      return;
    }
    try {
      setLoading(true);
      console.log('Deleting FAQ with ID:', id);
      console.log('FAQ data before delete:', faqData);
      const result = await deleteFAQ(id);
      console.log('API response:', result);
      const newFaqData = faqData.filter(item => item.id !== id);
      console.log('FAQ data after delete:', newFaqData);
      setFaqData(newFaqData);
      Alert.alert('Success', result.message || 'FAQ deleted successfully');
    } catch (error) {
      console.error('Delete FAQ error:', error);
      Alert.alert('Error', error.message || 'Failed to delete FAQ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F8FA' }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Image source={backButton} style={{ height: 20, width: 20 }} />
        </Pressable>
        <Text style={styles.headerTitle}>Marketing & Social</Text>
      </View>

      {/* Content */}
      {!loading && (
        <ScrollView
          contentContainerStyle={{ padding: 8 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Social Media Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('social')}
            >
              <Text style={styles.sectionTitle}>Social Media</Text>
              <Text>{expandedSections.social ? '-' : '+'}</Text>
            </TouchableOpacity>

            {expandedSections.social && (
              <>
                {socialData.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <View style={styles.itemLeft}>
                      {item.icon && (
                        <Image source={item.icon} style={styles.icon} />
                      )}
                      <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                    <TextInput
                      value={item.value}
                      onChangeText={text => {
                        console.log('Social input:', text); 
                        const newData = [...socialData];
                        newData[index].value = text;
                        setSocialData(newData);
                      }}
                      style={styles.input}
                      placeholder="Enter URL"
                      placeholderTextColor="gray"
                      color="#000"
                    />
                    {/* <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleEditSocial(index)}
                    >
                      <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDeleteSocial(index)}
                    >
                      <Text style={styles.deleteBtnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.addFAQButton}
                  onPress={handleSaveSocialLinks}
                >
                  <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('faq')}
            >
              <Text style={styles.sectionTitle}>FAQ Management</Text>
              <Text>{expandedSections.faq ? '-' : '+'}</Text>
            </TouchableOpacity>

            {expandedSections.faq && (
              <>
                <View style={styles.faqHeader}>
                  <TextInput
                    placeholder="New Question"
                    placeholderTextColor="gray"
                    style={[styles.searchInput, { flex: 1, marginRight: 8 }]}
                    value={newFAQ.question}
                    onChangeText={text =>
                      setNewFAQ(prev => ({ ...prev, question: text }))
                    }
                    color="#000"
                  />
                  <TextInput
                    placeholder="New Answer"
                    placeholderTextColor="gray"
                    style={[styles.searchInput, { flex: 1, marginRight: 8 }]}
                    value={newFAQ.answer}
                    onChangeText={text =>
                      setNewFAQ(prev => ({ ...prev, answer: text }))
                    }
                    color="#000"
                  />
                  <TouchableOpacity
                    style={styles.addFAQButton}
                    onPress={addFAQHandler}
                  >
                    <Text style={styles.addButtonText}>+ Add FAQ</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  style={styles.tableScrollView}
                >
                  <DataTable style={styles.dataTable}>
                    <DataTable.Header style={styles.tableHeader}>
                      <DataTable.Title
                        style={[
                          styles.tableHeaderCell,
                          { justifyContent: 'flex-start' },
                        ]}
                        textStyle={styles.headerText}
                      >
                        ID
                      </DataTable.Title>
                      <DataTable.Title
                        style={[
                          styles.tableHeaderCell,
                          { justifyContent: 'flex-start' },
                        ]}
                        textStyle={styles.headerText}
                      >
                        Question
                      </DataTable.Title>
                      <DataTable.Title
                        style={[
                          styles.tableHeaderCell,
                          { justifyContent: 'flex-start' },
                        ]}
                        textStyle={styles.headerText}
                      >
                        Answer
                      </DataTable.Title>
                      <DataTable.Title
                        style={[
                          styles.tableHeaderCell,
                          { justifyContent: 'flex-start' },
                        ]}
                        textStyle={styles.headerText}
                      >
                        Created
                      </DataTable.Title>
                      <DataTable.Title
                        style={[
                          styles.tableHeaderCell,
                          { justifyContent: 'flex-start' },
                        ]}
                        textStyle={styles.headerText}
                      >
                        Updated
                      </DataTable.Title>
                      <DataTable.Title
                        style={[
                          styles.tableHeaderCell,
                          { justifyContent: 'flex-start' },
                        ]}
                        textStyle={styles.headerText}
                      >
                        Action
                      </DataTable.Title>
                    </DataTable.Header>

                    {faqData.map((item, index) => (
                      <DataTable.Row key={item.id ?? `faq-${index}`}>
                        <DataTable.Cell
                          style={[
                            styles.tableCell,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.cellText}
                          >
                            {item.id}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[
                            styles.tableCell,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.cellText}
                          >
                            {item.question}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[
                            styles.tableCell,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.cellText}
                          >
                            {item.answer}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[
                            styles.tableCell,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.cellText}
                          >
                            {new Date(item.created_at).toLocaleString()}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[
                            styles.tableCell,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.cellText}
                          >
                            {new Date(item.updated_at).toLocaleString()}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[
                            styles.tableCell,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <View style={styles.actionButtons}>
                            <Button
                              mode="outlined"
                              onPress={() => handleEditFAQ(item)}
                              style={styles.editButton}
                              labelStyle={styles.editButtonLabel}
                            >
                              Edit
                            </Button>
                            <Button
                              mode="contained"
                              onPress={() => deleteFAQ(item.id)}
                              style={styles.deleteButton}
                              labelStyle={styles.deleteButtonLabel}
                            >
                              Delete
                            </Button>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </ScrollView>
              </>
            )}
          </View>
        </ScrollView>
      )}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1BB83A" />
        </View>
      )}

      {/* Social Media Edit Modal */}
      <Modal animationType="slide" transparent visible={socialModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Social Media Link</Text>
            <Text style={styles.inputLabel}>{editSocial.title} URL</Text>
            <TextInput
              style={[styles.input, styles.modalInput, {color: '#000'}]}
              placeholder={`Enter ${editSocial.title} URL`}
              placeholderTextColor="gray"
              value={editSocial.value}
              onChangeText={text => {
                setEditSocial(prev => ({ ...prev, value: text }));
              }}
              // color="#000"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setSocialModalVisible(false);
                  setEditSocial({
                    index: null,
                    title: '',
                    value: '',
                    apiKey: '',
                  });
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleUpdateSocial}
              >
                <Text style={styles.saveBtnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FAQ Edit Modal */}
      <Modal animationType="slide" transparent visible={faqModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit FAQ</Text>

            <Text style={styles.inputLabel}>Question</Text>
            <TextInput
              style={[styles.input, styles.modalInput]}
              placeholder="Enter question"
              placeholderTextColor="gray"
              value={editFAQ.question}
              onChangeText={text => {
                console.log('FAQ question input:', text); // Debug input
                setEditFAQ(prev => ({ ...prev, question: text }));
              }}
              color="#000"
            />

            <Text style={styles.inputLabel}>Answer</Text>
            <TextInput
              style={[styles.textArea, styles.modalTextArea]}
              multiline
              numberOfLines={4}
              placeholder="Enter answer"
              placeholderTextColor="gray"
              value={editFAQ.answer}
              onChangeText={text => {
                console.log('FAQ answer input:', text); // Debug input
                setEditFAQ(prev => ({ ...prev, answer: text }));
              }}
              color="#000"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setFaqModalVisible(false);
                  setEditFAQ({ id: null, question: '', answer: '' });
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleUpdateFAQ}
              >
                <Text style={styles.saveBtnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#E6F0EC',
    position: 'relative',
    zIndex: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  goBackButton: {
    padding: 10,
    zIndex: 1,
  },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#DDECE5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C5D4CC',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginLeft: 8,
    backgroundColor: '#F9F9F9',
  },
  modalInput: {
  height: 60, 
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 18,
  backgroundColor: '#F9F9F9',
  color: 'black', 
  marginBottom: 12,
  justifyContent: "flex-start"
},
modalTextArea: {
  height: 140, 
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 10,
  backgroundColor: '#F9F9F9',
  color: '#000', 
  textAlignVertical: 'top',
  marginBottom: 12,
},

  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  editBtnText: {
    color: 'black',
    fontWeight: '600',
  },
  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
    backgroundColor: '#F44336',
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  addFAQButton: {
    backgroundColor: '#1BB83A',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableScrollView: {
    maxHeight: 400,
  },
  dataTable: {
    minWidth: 800,
  },
  tableHeader: {
    backgroundColor: '#DDECE5',
  },
  tableHeaderCell: {
    flex: 1,
    justifyContent: 'flex-start', // Align header text to full left
    paddingLeft: 0, // Remove any left padding
  },
  headerText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'left', // Explicit left alignment
  },
  tableCell: {
    flex: 1,
    justifyContent: 'flex-start', // Align cell content to full left
    paddingLeft: 0, // Remove any left padding
  },
  cellText: {
    textAlign: 'left', // Explicit left alignment for cell text
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  deleteButton: {
    marginRight: 8,
    backgroundColor: '#F44336',
  },
  editButtonLabel: {
    color: '#000',
    fontSize: 12,
  },
  deleteButtonLabel: {
    color: '#fff',
    fontSize: 12,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: '#F9F9F9',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 20,
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 8,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 12,
    backgroundColor: '#F9F9F9',
    minHeight: 100,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  cancelBtnText: {
    color: '#333',
    fontWeight: '500',
  },
  saveBtn: {
    backgroundColor: '#1BB83A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MarketingAndSocial;
