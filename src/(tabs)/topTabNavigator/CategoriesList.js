import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';

const CategoryList = () => {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Clothing',
      description: 'All cultural dresses',
      status: 'Active',
      createdAt: '2025-09-10',
      updatedAt: '2025-09-10',
    },
    {
      id: '2',
      name: 'Electronics',
      description: 'Gadgets and devices',
      status: 'Active',
      createdAt: '2025-09-12',
      updatedAt: '2025-09-12',
    },
    {
      id: '3',
      name: 'Books',
      description: 'Educational materials',
      status: 'Inactive',
      createdAt: '2025-09-14',
      updatedAt: '2025-09-14',
    },
  ]);

  const [filterText, setFilterText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
  });

  const columnWidths = {
    id: 50,
    name: 150,
    description: 200,
    status: 120,
    createdAt: 120,
    updatedAt: 120,
    actions: 140,
  };
  const totalWidth = Object.values(columnWidths).reduce((a, b) => a + b, 0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const openModalForAdd = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', status: 'Active' });
    setModalVisible(true);
  };
  const openModalForEdit = item => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      status: item.status,
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation', 'Category name is required.');
      return;
    }
    if (editingId) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingId
            ? {
                ...cat,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : cat,
        ),
      );
    } else {
      setCategories(prev => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    setModalVisible(false);
  };

  const handleDelete = id => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setCategories(prev => prev.filter(cat => cat.id !== id)),
      },
    ]);
  };

  const renderCategoryItem = ({ item }) => (
    <View style={[styles.row, { width: totalWidth }]}>
      <Text style={[styles.cell, { width: columnWidths.id }]}>{item.id}</Text>
      <Text style={[styles.cell, { width: columnWidths.name }]}>
        {item.name}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.description }]}>
        {item.description}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.status }]}>
        {item.status}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.createdAt }]}>
        {item.createdAt}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.updatedAt }]}>
        {item.updatedAt}
      </Text>
      <View
        style={[
          styles.cell,
          { width: columnWidths.actions, flexDirection: 'row' },
        ]}
      >
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => openModalForEdit(item)}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Categories</Text>
        <TouchableOpacity style={styles.addButton} onPress={openModalForAdd}>
          <Text style={styles.addButtonText}>+ Add Category</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Category..."
        value={filterText}
        placeholderTextColor="#6B7280"
        onChangeText={setFilterText}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={{ minWidth: totalWidth }}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: columnWidths.id }]}>
              #
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.name }]}>
              Name
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
              Created At
            </Text>
            <Text
              style={[styles.headerCell, { width: columnWidths.updatedAt }]}
            >
              Updated At
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.actions }]}>
              Actions
            </Text>
          </View>

          <FlatList
            data={categories.filter(cat =>
              cat.name.toLowerCase().includes(filterText.toLowerCase()),
            )}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingId ? 'Edit Category' : 'Add Category'}
            </Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter category name"
              placeholderTextColor="#6B7280"
              value={formData.name}
              onChangeText={text => setFormData({ ...formData, name: text })}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter description"
              placeholderTextColor="#6B7280"
              value={formData.description}
              onChangeText={text =>
                setFormData({ ...formData, description: text })
              }
            />

            <Text style={styles.label}>Status</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.statusText}>{formData.status}</Text>
              <Switch
                trackColor={{ false: '#D1D5DB', true: '#34D399' }}
                thumbColor={
                  formData.status === 'Active' ? '#10B981' : '#F3F3F3'
                }
                ios_backgroundColor="#D1D5DB"
                onValueChange={value =>
                  setFormData({
                    ...formData,
                    status: value ? 'Active' : 'Inactive',
                  })
                }
                value={formData.status === 'Active'}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#EF4444' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#10B981' }]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>
                  {editingId ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F9FAFB' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  addButtonText: { color: '#FFF', fontWeight: '600' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
  },
  headerCell: {
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 4,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 6,
  },
  cell: { paddingHorizontal: 4, fontSize: 12, color: '#111827' },
  editBtn: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  editText: { color: '#111827', fontSize: 12, fontWeight: '500' },
  deleteBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  deleteText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#111827' },
  modalInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusText: { fontSize: 16, fontWeight: '600', color: '#111827' },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: { color: '#FFF', fontWeight: '600', textAlign: 'center' },
});
