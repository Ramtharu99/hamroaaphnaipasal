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
import colors from '../constants/colors';

// ... (existing imports)

const MarketingAndSocial = ({ navigation }) => {
  // ... (existing state)

  // ... (existing useEffects and functions)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <CustomHeader title="Marketing & Social" leftType="back" />

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
              style={[styles.input, styles.modalInput, { color: '#000' }]}
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: '#E6F0EC', // Consider changing to colors.white or similar if needed, keeping as is for now but using colors const where appropriate
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
