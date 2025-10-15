// AppNavigator.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screens
import DashBoardScreen from './DashBoard';
import Orders from './OrderList';
import Analysis from './Analytics';
import Products from './Products';
import StoreInformation from '../screens/StoreInformation';
import Policies from '../screens/Policies';
import MarketingAndSocial from '../screens/MarketingAndSocial';
import Transactions from '../screens/Transactions';
import Operations from '../screens/Operations';
import Security from '../screens/Security';
import MoreSettings from '../screens/MoreSettings';
import Customization from '../screens/Customization';
import Promotions from '../screens/Promotions';
import Tickets from '../screens/Tickets';
import ManageStaff from '../screens/ManageStaff';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

// Tab icons
const icons = {
  DashBoard: 'home-outline',
  Orders: 'cart-outline',
  Products: 'clipboard-outline',
  Analytics: 'bar-chart-outline',
  Setting: 'settings-outline',
};

// Top Tabs inside Settings
const SettingsTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIndicatorStyle: { backgroundColor: '#1BB83A' },
      }}
    >
      <TopTab.Screen name="Attributes" component={StoreInformation} />
      <TopTab.Screen name="Category" component={Policies} />
    </TopTab.Navigator>
  );
};

// Settings Stack with Dropdown
const SettingsStack = () => {
  const [moreDropdownVisible, setMoreDropdownVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleMoreDropdown = () => {
    if (moreDropdownVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setMoreDropdownVisible(false));
    } else {
      setMoreDropdownVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const scaleY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const rotateIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const settingsTabs = [
    'Store Information',
    'Policies',
    'Marketing & Social',
    'Transactions',
    'Operations',
    'Security',
    'More Settings',
  ];
  const moreOptions = [
    'Customization',
    'Promotions',
    'Tickets',
    'Manage Staff',
  ];

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingsHome"
        component={({ navigation }) => (
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.headerRow}>
              <Text style={styles.modalHeader}>⚙️ Settings</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="person-circle-outline" size={40} color="#1BB83A" />
              </TouchableOpacity>
            </View>

            {settingsTabs.map(tab => (
              <View key={tab}>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => {
                    if (tab === 'More Settings') toggleMoreDropdown();
                    else if (tab === 'Attributes' || tab === 'Category')
                      navigation.navigate('SettingsTabs');
                    else navigation.navigate(tab);
                  }}
                >
                  <Text style={styles.optionText}>{tab + " "}</Text>
                  {tab === 'More Settings' && (
                    <Animated.View
                      style={{ transform: [{ rotate: rotateIcon }] }}
                    >
                      <Icon
                        name="chevron-down-outline"
                        size={20}
                        color="#333"
                      />
                    </Animated.View>
                  )}
                </TouchableOpacity>

                {tab === 'More Settings' && moreDropdownVisible && (
                  <Animated.View
                    style={[
                      styles.dropdownContainer,
                      { transform: [{ scaleY }], opacity: slideAnim },
                    ]}
                  >
                    {moreOptions.map(option => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setMoreDropdownVisible(false);
                          navigation.navigate(option);
                        }}
                      >
                        <Text style={styles.dropdownOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                )}
              </View>
            ))}
          </SafeAreaView>
        )}
      />
      <Stack.Screen name="SettingsTabs" component={SettingsTabs} />
      <Stack.Screen name="Store Information" component={StoreInformation} />
      <Stack.Screen name="Policies" component={Policies} />
      <Stack.Screen name="Marketing & Social" component={MarketingAndSocial} />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="Operations" component={Operations} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="More Settings" component={MoreSettings} />
      <Stack.Screen name="Customization" component={Customization} />
      <Stack.Screen name="Promotions" component={Promotions} />
      <Stack.Screen name="Tickets" component={Tickets} />
      <Stack.Screen name="Manage Staff" component={ManageStaff} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 12,
            height: 70,
            borderRadius: 20,
            paddingTop: 8,
            paddingBottom: 8,
            elevation: 8,
            marginHorizontal: 8,
          },
          tabBarIcon: ({ focused }) => {
            const iconName = icons[route.name];
            return (
              <Icon
                name={iconName}
                size={25}
                color={focused ? '#1BB83A' : 'black'} // active tab green, inactive black
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                marginTop: 2,
                fontWeight: focused ? '600' : '400',
                color: focused ? '#1BB83A' : 'black',
              }}
            >
              {route.name}
            </Text>
          ),
        })}
      >
        <Tab.Screen name="DashBoard" component={DashBoardScreen} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="Analytics" component={Analysis} />
        <Tab.Screen name="Setting" component={SettingsStack} />
      </Tab.Navigator>
    </>
  );
};

// Root App Navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  modalContent: { flex: 1, backgroundColor: '#E7EEE6', padding: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalHeader: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  optionText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // allow text to shrink instead of truncating
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownContainer: {
    marginLeft: 24,
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownOptionText: { fontSize: 14, color: '#333' },
});

export default AppNavigator;
