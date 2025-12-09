import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const Policies = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <CustomHeader
        title="Policies"
        leftType="back"
        rightComponent={
          <TouchableOpacity
            style={styles.addPolicyBtn}
            onPress={() => {
              setEditIndex(null);
              setNewPolicyTitle('');
              setNewPolicyContent('');
              setModalVisible(true);
            }}
          >
            <Text style={styles.addPolicyBtnText}>+ Add Policy</Text>
          </TouchableOpacity>
        }
      />

      {/* Loading */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#1BB83A" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 8 }}>
          <View style={styles.section}>
            {policySections.map((section, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.title)}
                >
                  <Text style={styles.sectionHeaderText}>{section.title}</Text>
                  <Text>{expandedSections[section.title] ? '-' : '+'}</Text>
                </TouchableOpacity>

                {expandedSections[section.title] && (
                  <View style={styles.sectionContent}>
                    {renderPolicyContent(section.content)}

                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => handleEdit(index)}
                      >
                        <Text style={styles.editBtnText}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.actionBtn,
                          { backgroundColor: '#F44336' },
                        ]}
                        onPress={() => handleDeletePopup(index)}
                      >
                        <Text style={styles.actionBtnText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Modal */}
      {/* ... (Modal code remains same) ... */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Policy' : 'Add New Policy'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Policy Title"
              placeholderTextColor="gray"
              value={newPolicyTitle}
              onChangeText={setNewPolicyTitle}
            />

            <View style={styles.formattingToolbar}>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('bold')}
              >
                <Text style={styles.formatButtonText}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('italic')}
              >
                <Text
                  style={[styles.formatButtonText, { fontStyle: 'italic' }]}
                >
                  I
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('bullet')}
              >
                <Text style={styles.formatButtonText}>•</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('h1')}
              >
                <Text style={styles.formatButtonText}>H1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('h2')}
              >
                <Text style={styles.formatButtonText}>H2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formatButton}
                onPress={() => insertFormatting('h3')}
              >
                <Text style={styles.formatButtonText}>H3</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              ref={textInputRef}
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Policy Description (use **bold**, *italic*, - bullet, # heading)"
              placeholderTextColor="gray"
              value={newPolicyContent}
              onChangeText={setNewPolicyContent}
              onSelectionChange={({ nativeEvent: { selection } }) =>
                setSelection(selection)
              }
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setEditIndex(null);
                  setNewPolicyTitle('');
                  setNewPolicyContent('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddOrEditPolicy}
              >
                <Text style={styles.saveBtnText}>
                  {editIndex !== null ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Policies;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#E6F0EC',
  },
  goBackButton: { padding: 5, width: 100 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  addPolicyBtn: {
    backgroundColor: '#1BB83A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addPolicyBtnText: { color: '#fff', fontWeight: '600' },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#DDECE5',
    borderRadius: 6,
    marginBottom: 4,
  },
  sectionHeaderText: { fontSize: 16, fontWeight: '500' },
  sectionContent: {
    padding: 10,
    backgroundColor: '#F0F8F5',
    borderRadius: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  contentText: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  heading3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  bullet: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  editBtnText: { color: 'black', fontWeight: '600' },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  actionBtnText: { color: '#fff', fontWeight: '600' },
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
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    minHeight: 100,
  },
  formattingToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formatButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  formatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  cancelBtnText: { color: '#333', fontWeight: '500' },
  saveBtn: {
    backgroundColor: '#1BB83A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  saveBtnText: { color: '#fff', fontWeight: '600' },
});
