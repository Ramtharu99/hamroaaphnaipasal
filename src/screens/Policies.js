import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Policies = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const policySections = [
    {
      title: 'Return Policy',
      content: 'You can return any product within 30 days of purchase.',
    },
    {
      title: 'Terms and Conditions',
      content: 'By using our service, you agree to our terms and conditions.',
    },
    {
      title: 'Privacy Policy',
      content: 'We respect your privacy and protect your personal information.',
    },
  ];

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {/* Go Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text>
            <Text style={{ fontSize: 25 }}>← </Text>Go Back
          </Text>
        </TouchableOpacity>

        {/* Policies Section */}
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
                  <Text>{section.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  goBackButton: { padding: 10, marginBottom: 8 },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  sectionTitle: { fontWeight: '600', fontSize: 18, marginBottom: 12 },
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
  },
});

export default Policies;
