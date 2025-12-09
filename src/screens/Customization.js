import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Pressable,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomHeader from '../components/CustomHeader';
import backButton from '../../assets/images/arrow-back.png';

import colors from '../constants/colors';

// ... (existing imports)

const Customization = ({ navigation }) => {
  // ... (existing code)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Back Button */}
      <CustomHeader title="Customization" leftType="back" />

      <View style={styles.contentContainer}>
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          {['Themes', 'Banners', 'Colors'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.navButton,
                activeTab === tab && styles.navButtonActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.navButtonText,
                  activeTab === tab
                    ? styles.navButtonTextActive
                    : styles.navButtonTextInactive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="gray"
          />
          <Text style={styles.pagination}>
            Showing 1 to {filteredData.length} of {getCurrentData().length}{' '}
            {activeTab.toLowerCase()}
          </Text>
        </View>

        {/* Add New Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>

        {/* Scrollable Area */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredData.map(item => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              {item.active ? (
                <Text style={styles.activeTag}>Active</Text>
              ) : item.available ? (
                <Text style={styles.availableTag}>Available</Text>
              ) : null}
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>
                Last updated: {item.lastUpdated}
              </Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity style={styles.previewButton}>
                  <Text style={styles.previewButtonText}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleActivate(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {item.active ? 'Customize' : 'Activate'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Customization;

const styles = StyleSheet.create({
  // ... (headerRow can be removed)
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // ... (rest of styles)
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#1BB83A',
    borderWidth: 1,
  },
  navButtonActive: {
    backgroundColor: '#1BB83A',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  navButtonTextActive: {
    color: '#FFF',
  },
  navButtonTextInactive: {
    color: '#000',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  pagination: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: '#1BB83A',
    padding: 10,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  activeTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1BB83A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  availableTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    padding: 10,
  },
  cardDate: {
    fontSize: 14,
    color: '#6B7280',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  previewButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#1BB83A',
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 14,
  },
  previewButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
});
