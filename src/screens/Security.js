import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

// ... (existing imports)

const Security = ({ navigation }) => {
  // ... (existing state and useEffects)

  // ... (existing functions)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <CustomHeader title="Security" leftType="back" />

      {/* Content Area */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1BB83A" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 8 }}>
          {/* Sections */}
          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.title)}
              >
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
                <Text>{expandedSections[section.title] ? '-' : '+'}</Text>
              </TouchableOpacity>
              {expandedSections[section.title] && (
                <View style={styles.sectionContent}>
                  {section.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.itemRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDescription}>
                          {item.description}
                        </Text>
                      </View>
                      <View style={styles.toggleContainer}>
                        <Switch
                          value={item.enabled}
                          onValueChange={() =>
                            toggleItemStatus(sectionIndex, itemIndex)
                          }
                          trackColor={{ false: '#ccc', true: '#1BB83A' }}
                          thumbColor={item.enabled ? '#fff' : '#f4f3f4'}
                        />
                        <Text
                          style={[
                            styles.statusText,
                            { color: item.enabled ? '#1BB83A' : '#555' },
                          ]}
                        >
                          {item.enabled ? 'Enabled' : 'Disabled'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ... (remove headerRow, headerTitle, goBackButton)
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DDECE5',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontWeight: '600',
    fontSize: 16,
  },
  sectionContent: {
    padding: 12,
    backgroundColor: '#F7F9F7',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: '500',
    fontSize: 14,
  },
  itemDescription: {
    color: '#555',
    fontSize: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F7',
  },
});

export default Security;