import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSecuritySettings, updateSecuritySettings } from '../store/api'; 
import backButton from '../../assets/images/arrow-back.png';

const Security = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [sections, setSections] = useState([
    {
      title: 'Security Settings',
      items: [
        {
          name: 'Two-Factor Authentication',
          description: 'Secure account with extra verification',
          enabled: false,
        },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const settings = await getSecuritySettings();
        console.log('Fetched settings:', settings); // Debug log
        setSections([
          {
            title: 'Security Settings',
            items: [
              {
                name: 'Two-Factor Authentication',
                description: 'Secure account with extra verification',
                enabled: Boolean(settings.two_factor_enabled), // Convert 0/1 to boolean
              },
            ],
          },
        ]);
      } catch (error) {
        console.error('Failed to load security settings:', error.message);
        Alert.alert('Error', 'Failed to load security settings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();

    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleItemStatus = async (sectionIndex, itemIndex) => {
    const newEnabled = !sections[sectionIndex].items[itemIndex].enabled;

    // Optimistically update UI
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[sectionIndex].items[itemIndex].enabled = newEnabled;
      return newSections;
    });

    try {
      const payload = {
        two_factor_enabled: newEnabled ? 1 : 0,
        otp_status: 0, // Include otp_status, assuming it’s required
      };
      console.log('Sending payload to updateSecuritySettings:', payload); 
      await updateSecuritySettings(payload);
      Alert.alert('Success', 'Security settings updated successfully.');
    } catch (error) {
      console.error('Failed to update security settings:', error.message, { error });
      // Revert UI on failure
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[sectionIndex].items[itemIndex].enabled = !newEnabled;
        return newSections;
      });
      Alert.alert('Error', error.message || 'Failed to update security settings. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Image source={backButton} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
      </View>

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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#E6F0EC',
    position: 'relative',
    zIndex: 1, 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  goBackButton: {
    padding: 10,
    zIndex: 1,
  },
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