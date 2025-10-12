import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Pressable,
  Image,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backButton from "../../assets/images/arrow-back.png"

const Security = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [sections, setSections] = useState([
    {
      title: 'Security Settings',
      items: [
        {
          name: 'Two-Factor Authentication',
          description: 'Secure account with extra verification',
          enabled: true,
        },
      ],
    },
  ]);

  useEffect(() => {
    const backAction = () => {
      if(navigation.canGoBack()){
        navigation.goBack()
        return true
      }
      return false
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => backHandler.remove()
  }, [])

  const toggleSection = title => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleItemStatus = (sectionIndex, itemIndex) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].items[itemIndex].enabled =
        !newSections[sectionIndex].items[itemIndex].enabled;
      return newSections;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {/* Go Back Button */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <Image source={backButton} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Security</Text>
        </View>

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
});

export default Security;
