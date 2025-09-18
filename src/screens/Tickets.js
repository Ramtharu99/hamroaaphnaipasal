import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';
import backButton from "../../assets/images/arrow-back.png"

const Tickets = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    date: '',
    usage: '',
    status: 'Open',
    role: 'User',
  });
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [roleDropdownVisible, setRoleDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = [
        {
          title: 'VIP Pass Issue',
          description: 'Access denied',
          date: '2025-09-10',
          usage: '50/100',
          status: 'Open',
          role: 'Admin',
        },
        {
          title: 'Early Bird Delay',
          description: 'Entry delayed',
          date: '2025-09-15',
          usage: '25/50',
          status: 'In Progress',
          role: 'User',
        },
        {
          title: 'General Admission Error',
          description: 'Ticket not scanned',
          date: '2025-09-20',
          usage: '0/200',
          status: 'Resolved',
          role: 'Guest',
        },
        {
          title: 'Group Discount Problem',
          description: 'Group entry failed',
          date: '2025-09-25',
          usage: '10/30',
          status: 'In Progress',
          role: 'Admin',
        },
      ];
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(filterText.toLowerCase()),
  );

  const handleDelete = index => {
    setTickets(prev => prev.filter((_, i) => i !== index));
    showToast('Ticket deleted successfully!');
  };

  const handleEdit = index => {
    setEditIndex(index);
    setNewTicket({ ...tickets[index] });
    setModalVisible(true);
  };

  const toggleStatus = index => {
    setTickets(prev =>
      prev.map((ticket, i) => {
        if (i === index) {
          const statuses = ['Open', 'In Progress', 'Resolved'];
          const currentIndex = statuses.indexOf(ticket.status);
          const nextIndex = (currentIndex + 1) % statuses.length;
          return { ...ticket, status: statuses[nextIndex] };
        }
        return ticket;
      }),
    );
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setTickets(prev => {
        const newTickets = [...prev];
        newTickets[editIndex] = newTicket;
        return newTickets;
      });
      showToast('Ticket updated successfully!');
    } else {
      setTickets(prev => [...prev, newTicket]);
      showToast('Ticket added successfully!');
    }
    setModalVisible(false);
    setEditIndex(null);
    setNewTicket({
      title: '',
      description: '',
      date: '',
      usage: '',
      status: 'Open',
      role: 'User',
    });
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

  const customToast = props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  );

  const statusOptions = ['Open', 'In Progress', 'Resolved'];
  const roleOptions = ['Admin', 'User', 'Guest'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={backButton} style={{height: 20, width: 20}} />
        </Pressable>

        <Text style={styles.headerTitle}>Tickets</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditIndex(null);
            setNewTicket({
              title: '',
              description: '',
              date: '',
              usage: '',
              status: 'Open',
              role: 'User',
            });
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title..."
        value={filterText}
        onChangeText={setFilterText}
        placeholderTextColor="#6B7280"
      />

      {/* Tickets List */}
      <ScrollView style={styles.listContainer}>
        {filteredTickets.map((ticket, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>Title: {ticket.title}</Text>
              <Text style={styles.cardText}>
                Description: {ticket.description}
              </Text>
              <Text style={styles.cardText}>Date: {ticket.date}</Text>
              <Text style={styles.cardText}>Usage: {ticket.usage}</Text>
              <Text style={styles.cardText}>Role: {ticket.role}</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Status: </Text>
                <TouchableOpacity
                  onPress={() => toggleStatus(index)}
                  style={styles.statusButton}
                >
                  <Text style={styles.statusButtonText}>{ticket.status}</Text>
                </TouchableOpacity>
              </View>
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
          Showing {filteredTickets.length} of {tickets.length} tickets
        </Text>
      </ScrollView>

      {/* Main Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Ticket' : 'Add Ticket'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTicket.title}
              onChangeText={text =>
                setNewTicket(prev => ({ ...prev, title: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newTicket.description}
              onChangeText={text =>
                setNewTicket(prev => ({ ...prev, description: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newTicket.date}
              onChangeText={text =>
                setNewTicket(prev => ({ ...prev, date: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Usage (e.g., 50/100)"
              value={newTicket.usage}
              onChangeText={text =>
                setNewTicket(prev => ({ ...prev, usage: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => {
                setStatusDropdownVisible(true);
                setRoleDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>
                Status: {newTicket.status}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => {
                setRoleDropdownVisible(true);
                setStatusDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>Role: {newTicket.role}</Text>
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
                  setNewTicket(prev => ({ ...prev, status: option }));
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

      {/* Role Dropdown Modal */}
      <Modal
        transparent={true}
        visible={roleDropdownVisible}
        onRequestClose={() => setRoleDropdownVisible(false)}
      >
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownContent}>
            {roleOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setNewTicket(prev => ({ ...prev, role: option }));
                  setRoleDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.dropdownClose}
              onPress={() => setRoleDropdownVisible(false)}
            >
              <Text style={styles.dropdownCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast config={{ success: customToast }} />
    </SafeAreaView>
  );
};

export default Tickets;

// Styles remain mostly same, header updated
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 10 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E6F0EC',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { padding: 8 },
  backText: { fontSize: 20 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  listContainer: { flex: 1 },
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
  cardRow: { marginBottom: 10 },
  cardText: { fontSize: 14, color: '#374151', marginBottom: 5 },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  switchLabel: { fontSize: 14, color: '#374151', marginRight: 10 },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#81C784',
    borderRadius: 4,
  },
  statusButtonText: { fontSize: 12, color: '#000', fontWeight: '500' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: { color: '#fff' },
  actionText: { color: '#000', fontSize: 12, fontWeight: '500' },
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  dropdownText: { fontSize: 14, color: '#1F2937' },
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  dropdownItemText: { fontSize: 14, color: '#1F2937' },
  dropdownClose: {
    padding: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 10,
  },
  dropdownCloseText: { fontSize: 14, color: '#1F2937', textAlign: 'center' },
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
  toastContent: { paddingHorizontal: 15 },
  toastText1: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  toastText2: { fontSize: 14, color: '#FFF' },
});
