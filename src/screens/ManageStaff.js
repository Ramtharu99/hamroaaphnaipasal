import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';

const ManageStaff = ({ navigation }) => {
  const [staffList, setStaffList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    email: '',
    status: 'Active',
  });
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: 'John Doe',
        role: 'Administrator',
        email: 'john@example.com',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'Manager',
        email: 'jane@example.com',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Robert Johnson',
        role: 'Support',
        email: 'robert@example.com',
        status: 'Inactive',
      },
    ];
    setStaffList(data);
  }, []);

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...staffList];
      updated[editIndex] = { ...newStaff, id: staffList[editIndex].id };
      setStaffList(updated);
      showToast('Staff updated successfully!');
    } else {
      setStaffList(prev => [...prev, { ...newStaff, id: prev.length + 1 }]);
      showToast('Staff added successfully!');
    }
    setModalVisible(false);
    setEditIndex(null);
    setNewStaff({ name: '', role: '', email: '', status: 'Active' });
  };

  const handleEdit = index => {
    setEditIndex(index);
    setNewStaff(staffList[index]);
    setModalVisible(true);
  };

  const handleDelete = index => {
    setStaffList(prev => prev.filter((_, i) => i !== index));
    showToast('Staff deleted successfully!');
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

  const statusOptions = ['Active', 'Inactive'];

  const customToast = props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>
          <Text style={{ fontSize: 20 }}>← </Text>Go Back
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Staff</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditIndex(null);
            setNewStaff({ name: '', role: '', email: '', status: 'Active' });
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={filterText}
        onChangeText={setFilterText}
        placeholderTextColor="#6B7280"
      />

      {/* Staff List */}
      <ScrollView style={styles.listContainer}>
        {filteredStaff.map((staff, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>ID: {staff.id}</Text>
              <Text style={styles.cardText}>Name: {staff.name}</Text>
              <Text style={styles.cardText}>Role: {staff.role}</Text>
              <Text style={styles.cardText}>Email: {staff.email}</Text>
              <Text
                style={[
                  styles.cardText,
                  staff.status === 'Active'
                    ? styles.activeStatus
                    : styles.inactiveStatus,
                ]}
              >
                {staff.status}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(index)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.pagination}>
          Showing {filteredStaff.length} of {staffList.length} staff
        </Text>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Staff' : 'Add Staff'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newStaff.name}
              onChangeText={text =>
                setNewStaff(prev => ({ ...prev, name: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              value={newStaff.role}
              onChangeText={text =>
                setNewStaff(prev => ({ ...prev, role: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newStaff.email}
              onChangeText={text =>
                setNewStaff(prev => ({ ...prev, email: text }))
              }
              placeholderTextColor="#6B7280"
            />
            {/* Status Dropdown Trigger */}
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => setStatusDropdownVisible(true)}
            >
              <Text style={styles.dropdownText}>Status: {newStaff.status}</Text>
            </TouchableOpacity>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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

      {/* Status Dropdown Modal */}
      <Modal
        transparent={true}
        visible={statusDropdownVisible}
        onRequestClose={() => setStatusDropdownVisible(false)}
      >
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownContent}>
            {statusOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setNewStaff(prev => ({ ...prev, status: option }));
                  setStatusDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.dropdownClose}
              onPress={() => setStatusDropdownVisible(false)}
            >
              <Text style={styles.dropdownCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Toast Component */}
      <Toast config={{ success: customToast }} />
    </SafeAreaView>
  );
};

export default ManageStaff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 10,
  },
  backButton: {
    paddingVertical: 8,
    paddingLeft: 5,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardRow: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
  },
  activeStatus: {
    color: '#10B981',
    fontWeight: '600',
  },
  inactiveStatus: {
    color: '#EF4444',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
    borderColor: "gray",
    borderWidth: 2
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff"
  },
  actionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  pagination: {
    textAlign: 'center',
    marginTop: 10,
    color: '#6B7280',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    fontSize: 14,
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1F2937',
  },
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    maxHeight: '30%',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F2937',
  },
  dropdownClose: {
    padding: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 10,
  },
  dropdownCloseText: {
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  toast: {
    borderLeftWidth: 0,
    height: 60,
    width: '90%',
    backgroundColor: '#10B981',
    borderRadius: 8,
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
