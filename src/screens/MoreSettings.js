import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

// ... (existing imports)

const MoreSettings = ({ navigation }) => {
  // ... (existing useEffect)

  // ... (existing handleOptionPress)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Back Button */}
      <CustomHeader title="More Settings" leftType="back" />
      <View style={styles.dropdownContainer}>
        {moreOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.dropdownItem}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.dropdownText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  dropdownContainer: {
    backgroundColor: '#F7F9F7',
    marginHorizontal: 12,
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 12,
    elevation: 3,
    zIndex: 10,
    marginTop: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default MoreSettings;