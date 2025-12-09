import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

// ... (existing imports)

const Promotion = ({ navigation, promotions: initialPromotions = [] }) => {
  // ... (existing state and useEffects)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <CustomHeader
        title="Promotions"
        leftType="back"
        rightComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setEditIndex(null);
              setNewPromotion({
                name: '',
                promoCode: '',
                discount: '',
                startDate: '',
                endDate: '',
                usage: '',
                isActive: true,
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
        placeholder="Search by name..."
        value={filterText}
        onChangeText={setFilterText}
        placeholderTextColor="#6B7280"
      />

      {/* Promotions List */}
      <ScrollView style={styles.listContainer}>
        {filteredPromotions.map((promo, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>Name: {promo.name}</Text>
              <Text style={styles.cardText}>Code: {promo.promoCode}</Text>
              <Text style={styles.cardText}>Discount: {promo.discount}</Text>
              <Text style={styles.cardText}>
                Dates: {promo.startDate} - {promo.endDate}
              </Text>
              <Text style={styles.cardText}>Usage: {promo.usage}</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Active: </Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={promo.isActive ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleActive(index)}
                  value={promo.isActive}
                />
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
          Showing {filteredPromotions.length} of {promotions.length} deals
        </Text>
      </ScrollView>

      {/* Modal */}
      {/* ... (Modal stays same) ... */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Promotion' : 'Add Promotion'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newPromotion.name}
              onChangeText={text =>
                setNewPromotion(prev => ({ ...prev, name: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Promo Code"
              value={newPromotion.promoCode}
              onChangeText={text =>
                setNewPromotion(prev => ({ ...prev, promoCode: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Discount"
              value={newPromotion.discount}
              onChangeText={text =>
                setNewPromotion(prev => ({ ...prev, discount: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              value={newPromotion.startDate}
              onChangeText={text =>
                setNewPromotion(prev => ({ ...prev, startDate: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="End Date (YYYY-MM-DD)"
              value={newPromotion.endDate}
              onChangeText={text =>
                setNewPromotion(prev => ({ ...prev, endDate: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              placeholder="Usage (e.g., 142,500 or 0/200)"
              value={newPromotion.usage}
              onChangeText={text =>
                setNewPromotion(prev => ({ ...prev, usage: text }))
              }
              placeholderTextColor="#6B7280"
            />
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Active: </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={newPromotion.isActive ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value =>
                  setNewPromotion(prev => ({ ...prev, isActive: value }))
                }
                value={newPromotion.isActive}
              />
            </View>
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

      <Toast config={{ success: customToast }} />
    </SafeAreaView>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E6F0EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  goBackButton: { padding: 8 },
  backIcon: { width: 20, height: 20, resizeMode: 'contain' },
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
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  editButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: { color: 'white' },
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
