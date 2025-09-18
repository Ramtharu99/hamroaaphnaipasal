import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const moreOptions = ['Customization', 'Promotions', 'Tickets', 'Manage Staff'];

const MoreSettings = ({ navigation }) => {

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
  }, [navigation])

  
  const handleOptionPress = (option) => {
    try {
      navigation.navigate(option);
    } catch (error) {
      console.error(`Navigation to ${option} failed:`, error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F0EC' }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10, marginBottom: 20 }}
      >
        <Text>
          <Text style={{ fontSize: 25 }}>← </Text>Go Back
        </Text>
      </TouchableOpacity>
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
  dropdownContainer: {
    backgroundColor: '#F7F9F7',
    marginHorizontal: 12,
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 12,
    elevation: 3,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6F0EC',
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default MoreSettings;