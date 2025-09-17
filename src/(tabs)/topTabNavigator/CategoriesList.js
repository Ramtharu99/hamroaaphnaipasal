import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';

const CategoryList = ({ navigation }) => {
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCategories(prev => [...prev]);
      setRefreshing(false);
    }, 1500);
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

  const customToast = props => {
    <BaseToast
      {...props}
      style={styles.Toast}
      contentContainerStyle={styles.toastContainer}
      text1={styles.toastText1}
      text2={styles.toastText2}
    />;
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
    if (editCategory) {
      // edit
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editCategory.id
            ? {
                ...cat,
                name: categoryName,
                description: categoryDescription,
                status: categoryStatus,
              }
            : cat,
        ),
      );
      showToast("Category updated successfully!")
    } else {
      // add new
      const newCategory = {
        id: (categories.length + 1).toString(),
        name: categoryName,
        description: categoryDescription,
        status: categoryStatus,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setCategories(prev => [...prev, newCategory]);
      showToast("Product addes successfully!")
    }

    setModalVisible(false);
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(prev => prev.filter(cat => cat.id !== selectedCategory.id));
      setSelectedCategory(null);
      showToast("Category deleted successfully!")
    }
  };

  const deleteSeprateCategory = id => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setSelectedCategory(null);
    showToast("Category deleted successfully")
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryRow}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() =>
          setSelectedCategory(item.id === selectedCategory?.id ? null : item)
        }
      >
        <Text>{item.id === selectedCategory?.id ? '✓' : ''}</Text>
      </TouchableOpacity>
      <Text style={[styles.categoryText, { width: 140 }]}>{item.name}</Text>
      <Text style={[styles.categoryText, { width: 200 }]}>
        {item.description}
      </Text>
      <Text
        style={[
          styles.statusText,
          {
            width: 90,
            backgroundColor: item.status === 'Active' ? '#10B981' : '#EF4444',
          },
        ]}
      >
        {item.status}
      </Text>
      <Text style={[styles.categoryText, { width: 120 }]}>
        {item.createdAt}
      </Text>
      <Text style={[styles.categoryText, { width: 120 }]}>
        {item.updatedAt}
      </Text>
      <View style={[styles.actions, { width: 70 }]}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditCategoryModal(item)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteSeprateCategory(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: '#F9FAFB' }}>
      <View style={styles.categoryHeader}>
        <Text style={styles.headerTitle}>Product Categories</Text>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openAddCategoryModal}
          >
            <Text style={styles.addButtonText}>+ Add New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.deleteButton,
              !selectedCategory && { backgroundColor: '#EF4444', opacity: 0.5 },
            ]}
            onPress={() =>
              selectedCategory && handleDeleteCategory(selectedCategory.id)
            }
            disabled={!selectedCategory}
          >
            <Text style={styles.addButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        value={filterText}
        onChangeText={setFilterText}
        placeholderTextColor="#6B7280"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <FlatList
            data={categories.filter(cat =>
              cat.name.toLowerCase().includes(filterText.toLowerCase()),
            )}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { width: 60 }]}>#</Text>
                <Text style={[styles.headerText, { width: 140 }]}>
                  Category
                </Text>
                <Text style={[styles.headerText, { width: 200 }]}>
                  Description
                </Text>
                <Text style={[styles.headerText, { width: 90 }]}>Status</Text>
                <Text style={[styles.headerText, { width: 120 }]}>
                  Created At
                </Text>
                <Text style={[styles.headerText, { width: 120 }]}>
                  Updated At
                </Text>
                <Text style={[styles.headerText, { width: 70 }]}>Actions</Text>
              </View>
            }
            ListFooterComponent={
              <Text style={styles.pagination}>
                Showing 1 to {categories.length} of {categories.length}
                categories
              </Text>
            }
          />
        </View>
        <Modal transparent={true} visible={modalVisible} animationType="slide">
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
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveCategory}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Toast config={{ success: customToast }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerText: {
    fontWeight: '700',
    color: '#1F2937',
    fontSize: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedRow: {
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
  },
  statusText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  actionText: {
    color: '#1F2937',
    fontWeight: '700',
  },
  pagination: {
    textAlign: 'center',
    marginTop: 12,
    color: '#6B7280',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    // justifyContent: "center",
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '85%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#111827',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#111827',
  },
  saveButton: {
    backgroundColor: '#10B981',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  toastContent: {
    paddingHorizontal: 15,
  },
  toastText1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  toastText2: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default CategoryList;
