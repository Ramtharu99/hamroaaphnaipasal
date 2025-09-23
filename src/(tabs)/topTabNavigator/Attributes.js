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

const Attributes = () => {
  const [attributes, setAttributes] = useState([
    {
      id: '1',
      class: 'Electronics',
      attribute: 'Color',
      values: ['Red', 'Blue', 'Green'],
      type: 'Dropdown',
      variant: 'Yes',
      filter: 'Yes',
      status: 'Active',
      created: '2025-09-10',
    },
    {
      id: '2',
      class: 'Clothing',
      attribute: 'Size',
      values: ['S', 'M', 'L'],
      type: 'Dropdown',
      variant: 'No',
      filter: 'Yes',
      status: 'Active',
      created: '2025-09-12',
    },
  ]);

  const [filterText, setFilterText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    class: '',
    attribute: '',
    values: '',
    type: '',
    variant: '',
    filter: '',
    status: 'Active',
  });

  const columnWidths = {
    id: 50,
    class: 100,
    attribute: 120,
    values: 200,
    type: 120,
    variant: 100,
    filter: 100,
    status: 120,
    created: 150,
    actions: 150,
  };

  const totalWidth = Object.values(columnWidths).reduce((a, b) => a + b, 0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const openModalForAdd = () => {
    setEditingId(null);
    setFormData({
      class: '',
      attribute: '',
      values: '',
      type: '',
      variant: '',
      filter: '',
      status: 'Active',
    });
    setModalVisible(true);
  };

  const openModalForEdit = item => {
    setEditingId(item.id);
    setFormData({
      class: item.class,
      attribute: item.attribute,
      values: item.values.join(', '),
      type: item.type,
      variant: item.variant,
      filter: item.filter,
      status: item.status,
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.attribute.trim()) {
      Alert.alert('Validation', 'Attribute name is required.');
      return;
    }

    const newAttribute = {
      id: editingId ? editingId : (attributes.length + 1).toString(),
      class: formData.class,
      attribute: formData.attribute,
      values: formData.values.split(',').map(v => v.trim()),
      type: formData.type,
      variant: formData.variant,
      filter: formData.filter,
      status: formData.status,
      created: editingId
        ? attributes.find(attr => attr.id === editingId).created
        : new Date().toISOString().split('T')[0],
    };

    if (editingId) {
      setAttributes(prev =>
        prev.map(attr => (attr.id === editingId ? newAttribute : attr)),
      );
    } else {
      setAttributes(prev => [...prev, newAttribute]);
    }

    setModalVisible(false);
  };

  const handleDelete = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this attribute?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setAttributes(prev => prev.filter(attr => attr.id !== id)),
        },
      ],
    );
  };

  const renderAttributeItem = ({ item }) => (
    <View style={[styles.row, { width: totalWidth }]}>
      <Text style={[styles.cell, { width: columnWidths.id }]}>{item.id}</Text>
      <Text style={[styles.cell, { width: columnWidths.class }]}>
        {item.class}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.attribute }]}>
        {item.attribute}
      </Text>
      <View
        style={[
          styles.cell,
          {
            width: columnWidths.values,
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
        ]}
      >
        {item.values.map((val, index) => (
          <Text key={index} style={styles.valueBadge}>
            {val}
          </Text>
        ))}
      </View>
      <Text style={[styles.cell, { width: columnWidths.type }]}>
        {item.type}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.variant }]}>
        {item.variant}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.filter }]}>
        {item.filter}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.status }]}>
        {item.status}
      </Text>
      <Text style={[styles.cell, { width: columnWidths.created }]}>
        {item.created}
      </Text>
      <View
        style={[
          styles.cell,
          {
            width: columnWidths.actions,
            flexDirection: 'row',
            justifyContent: 'center',
          },
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
        <Text style={styles.pageTitle}>🎨 Attributes</Text>
        <TouchableOpacity style={styles.addButton} onPress={openModalForAdd}>
          <Text style={styles.addButtonText}>+ Add Attribute</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Attribute..."
        value={filterText}
        placeholderTextColor="gray"
        onChangeText={setFilterText}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ minWidth: totalWidth }}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: columnWidths.id }]}>
              #
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.class }]}>
              Class
            </Text>
            <Text
              style={[styles.headerCell, { width: columnWidths.attribute }]}
            >
              Attribute
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.values }]}>
              Values
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.type }]}>
              Type
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.variant }]}>
              Variant
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.filter }]}>
              Filter
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.status }]}>
              Status
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.created }]}>
              Created
            </Text>
            <Text style={[styles.headerCell, { width: columnWidths.actions }]}>
              Actions
            </Text>
          </View>

          <FlatList
            data={attributes.filter(attr =>
              attr.attribute.toLowerCase().includes(filterText.toLowerCase()),
            )}
            renderItem={renderAttributeItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingId ? 'Edit Attribute' : 'Add Attribute'}
            </Text>

            <Text style={styles.label}>Class</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter class"
              placeholderTextColor="gray"
              value={formData.class}
              onChangeText={text => setFormData({ ...formData, class: text })}
            />

            <Text style={styles.label}>Attribute</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter attribute"
              placeholderTextColor="gray"
              value={formData.attribute}
              onChangeText={text =>
                setFormData({ ...formData, attribute: text })
              }
            />

            <Text style={styles.label}>Values (comma separated)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Red, Blue, Green"
              placeholderTextColor="gray"
              value={formData.values}
              onChangeText={text => setFormData({ ...formData, values: text })}
            />

            <Text style={styles.label}>Type</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter type"
              placeholderTextColor="gray"
              value={formData.type}
              onChangeText={text => setFormData({ ...formData, type: text })}
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
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#10B981' }]}
                onPress={handleSave}
              >
                <Text style={styles.modalBtnText}>
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

export default Attributes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#E7EEE6' },
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
  addButtonText: { color: '#fff', fontWeight: '600' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#C8E6C9',
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
    borderBottomColor: '#111827',
    paddingVertical: 6,
  },
  cell: { paddingHorizontal: 4, fontSize: 12, color: '#111827' },
  valueBadge: {
    backgroundColor: '#42A5F5',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  editBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 2,
    borderColor: "gray",
    borderWidth: 2
  },
  editText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
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
    padding: 8,
    marginBottom: 12,
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
  modalBtnText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
});
