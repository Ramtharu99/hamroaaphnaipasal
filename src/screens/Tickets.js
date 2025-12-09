import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

// ... (existing imports)

const Tickets = ({ navigation }) => {
  // ... (existing state and useEffects)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <CustomHeader
        title="Tickets"
        leftType="back"
        rightComponent={
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
        }
      />

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
      {/* ... (Modals remain same) ... */}
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
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
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
