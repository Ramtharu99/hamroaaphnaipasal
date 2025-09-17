import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Transactions = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [sections, setSections] = useState([
    {
      title: 'Payment Methods',
      items: [
        { name: 'PayPal', description: 'Credit Cards - Powered By PayPal', enabled: true },
        { name: 'Stripe', description: 'Credit Cards - Powered By Stripe', enabled: true },
        { name: 'Khalti', description: 'Online Payment Services in Nepal', enabled: false },
        { name: 'Cash on Delivery', description: 'Pay when you receive your order', enabled: true },
      ],
    },
    {
      title: 'Subscriptions',
      items: [
        { name: 'Monthly Plan', description: 'Recurring monthly subscription', enabled: true },
        { name: 'Annual Plan', description: 'Recurring yearly subscription', enabled: false },
      ],
    },
  ]);

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleItemStatus = (sectionIndex, itemIndex) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].items[itemIndex].enabled = !newSections[sectionIndex].items[itemIndex].enabled;
      return newSections;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {/* Go Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10, marginBottom: 20 }}
        >
          <Text>
            <Text style={{ fontSize: 25 }}>← </Text>Go Back
          </Text>
        </TouchableOpacity>

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
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                    <View style={styles.toggleContainer}>
                      <Switch
                        value={item.enabled}
                        onValueChange={() => toggleItemStatus(sectionIndex, itemIndex)}
                        trackColor={{ false: '#ccc', true: '#1BB83A' }}
                        thumbColor={item.enabled ? '#fff' : '#f4f3f4'}
                      />
                      <Text style={[
                        styles.statusText,
                        { color: item.enabled ? '#1BB83A' : '#555' }
                      ]}>
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
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
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

export default Transactions;