import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  RefreshControl,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
};

const CategoryList = () => {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Clothing',
      description: 'All cultural dresses and apparel',
      status: 'Active',
      createdAt: '7/6/2025',
      updatedAt: '7/6/2025',
    },
    {
      id: '2',
      name: 'Emotions',
      description: 'Products related to human emotions',
      status: 'Active',
      createdAt: '7/6/2025',
      updatedAt: '7/6/2025',
    },
    {
      id: '3',
      name: 'Human Development',
      description: 'Resources for human growth',
      status: 'Inactive',
      createdAt: '4/21/2025',
      updatedAt: '4/21/2025',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('Active');
  const [refreshing, setRefreshing] = useState(false);

  const columnWidths = {
    id: 50,
    name: 150,
    description: 250,
    status: 100,
    createdAt: 120,
    updatedAt: 120,
    actions: 100,
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCategories(prev => [...prev]);
      setRefreshing(false);
    }, 1000);
  };

  const showToast = message => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const openAddCategoryModal = () => {
    setEditCategory(null);
    setCategoryName('');
    setCategoryDescription('');
    setCategoryStatus('Active');
    setModalVisible(true);
  };

  const openEditCategoryModal = category => {
    setEditCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setCategoryStatus(category.status);
    setModalVisible(true);
  };

  const saveCategory = () => {
    if (!categoryName.trim()) {
      showToast('Category name is required!');
      return;
    }
    if (editCategory) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editCategory.id
            ? {
                ...cat,
                name: categoryName,
                description: categoryDescription,
                status: categoryStatus,
                updatedAt: new Date().toLocaleDateString(),
              }
            : cat,
        ),
      );
      showToast('Category updated successfully!');
    } else {
      const newCategory = {
        id: (categories.length + 1).toString(),
        name: categoryName,
        description: categoryDescription,
        status: categoryStatus,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setCategories(prev => [...prev, newCategory]);
      showToast('Category added successfully!');
    }
    setModalVisible(false);
  };

  const deleteCategory = id => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    if (selectedCategory?.id === id) setSelectedCategory(null);
    showToast('Category deleted successfully!');
  };

  const renderCategoryItem = ({ item }) => (
    <Pressable
      style={[
        styles.categoryRow,
        item.id === selectedCategory?.id && styles.selectedRow,
      ]}
      onPress={() =>
        setSelectedCategory(item.id === selectedCategory?.id ? null : item)
      }
    >
      <Text style={[styles.categoryCell, { width: columnWidths.id }]}>
        {item.id}
      </Text>
      <Text style={[styles.categoryCell, { width: columnWidths.name }]}>
        {item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}
      </Text>
      <Text style={[styles.categoryCell, { width: columnWidths.description }]}>
        {item.description.length > 25 ? item.description.slice(0, 25) + "..." : item.description}
      </Text>
      <Text
        style={[
          styles.statusText,
          {
            width: columnWidths.status,
            backgroundColor: item.status === 'Active' ? '#10B981' : '#EF4444',
          },
        ]}
      >
        {item.status}
      </Text>
      <Text style={[styles.categoryCell, { width: columnWidths.createdAt }]}>
        {item.createdAt}
      </Text>
      <Text style={[styles.categoryCell, { width: columnWidths.updatedAt }]}>
        {item.updatedAt}
      </Text>
      <View style={[styles.actions, { width: columnWidths.actions }]}>
        <Pressable
          style={styles.editBtn}
          onPress={() => openEditCategoryModal(item)}
        >
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.deleteBtn}
          onPress={() => deleteCategory(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Categories</Text>
        <View style={styles.headerButtons}>
          <Pressable style={styles.addButton} onPress={openAddCategoryModal}>
            <Text style={styles.addButtonText}>+ Add New</Text>
          </Pressable>
          <Pressable
            style={[
              styles.deleteBtn,
              !selectedCategory && styles.disabledButton,
            ]}
            onPress={() =>
              selectedCategory && deleteCategory(selectedCategory.id)
            }
            disabled={!selectedCategory}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        placeholderTextColor="#9CA3AF"
        value={filterText}
        onChangeText={setFilterText}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator>
        <FlatList
          data={categories.filter(cat =>
            cat.name.toLowerCase().includes(filterText.toLowerCase()),
          )}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: columnWidths.id }]}>
                #
              </Text>
              <Text style={[styles.headerCell, { width: columnWidths.name }]}>
                Category
              </Text>
              <Text
                style={[styles.headerCell, { width: columnWidths.description }]}
              >
                Description
              </Text>
              <Text style={[styles.headerCell, { width: columnWidths.status }]}>
                Status
              </Text>
              <Text
                style={[styles.headerCell, { width: columnWidths.createdAt }]}
              >
                Created
              </Text>
              <Text
                style={[styles.headerCell, { width: columnWidths.updatedAt }]}
              >
                Updated
              </Text>
              <Text
                style={[styles.headerCell, { width: columnWidths.actions }]}
              >
                Actions
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>

      {/* Modal for Add/Edit */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editCategory ? 'Edit Category' : 'Add Category'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Category Name"
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <TextInput
              style={styles.input}
              placeholder="Category Description"
              value={categoryDescription}
              onChangeText={setCategoryDescription}
              multiline
              numberOfLines={3}
            />
            <View style={styles.statusToggleContainer}>
              {['Active', 'Inactive'].map(status => (
                <Pressable
                  key={status}
                  style={[
                    styles.statusBtn,
                    categoryStatus === status && {
                      backgroundColor:
                        status === 'Active' ? '#10B981' : '#EF4444',
                    },
                  ]}
                  onPress={() => setCategoryStatus(status)}
                >
                  <Text
                    style={[
                      styles.statusBtnText,
                      categoryStatus === status && styles.statusBtnTextActive,
                    ]}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.modalBtns}>
              <Pressable style={styles.saveBtn} onPress={saveCategory}>
                <Text style={styles.btnText}>Save</Text>
              </Pressable>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB', 
    paddingHorizontal: 16 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#1F2937' 
  },
  headerButtons: { 
    flexDirection: 'row', 
    gap: 8 
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 14 
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: { opacity: 0.5 },
  deleteText: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 14 
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  headerCell: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'left',
    marginRight: 12,
  },
  flatListContent: { paddingBottom: 16 },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
  },
  selectedRow: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  categoryCell: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'left',
    marginRight: 12,
  },
  statusText: {
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 12,
  fontWeight: '600',
  color: '#FFFFFF',
  textAlign: 'center',
  fontSize: 12,
  marginRight: 10
},
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 8 
  },
  editBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: { color: '#1F2937', fontSize: 12, fontWeight: '600' },
  pagination: {
    textAlign: 'center',
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: '90%',
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  statusToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusBtnText: { 
    fontWeight: '600', 
    fontSize: 14, 
    color: '#1F2937' 
  },
  statusBtnTextActive: { color: '#FFFFFF' },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  saveBtn: {
    backgroundColor: '#10B981',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#EF4444',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  toast: { backgroundColor: '#10B981', borderRadius: 8, padding: 12 },
  toastContainer: { paddingHorizontal: 12 },
  toastText1: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  toastText2: { fontSize: 14, color: '#FFFFFF' },
});

export default CategoryList;
