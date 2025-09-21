import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  BackHandler,
  Alert,
  Pressable,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

// Main Tabs
import DashBoardScreen from './DashBoard';
import Orders from './OrderList';
import Analysis from './Analytics';
import Products from './Products';

// Settings screens
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

const icons = {
  DashBoard: require('../../assets/images/home.png'),
  Orders: require('../../assets/images/order.png'),
  Products: require('../../assets/images/inventory.png'),
  Analytics: require('../../assets/images/analysis.png'),
  Setting: require('../../assets/images/setting.png'),
  Dropdown: require('../../assets/images/dropdown.png'),
  Profile: require('../../assets/images/profile.png'), // 👈 Add your profile image here
};

// Settings Top Tabs
const SettingsTabs = ({ navigation }) => {
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

// Settings Stack Navigator
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
            {/* Header row */}
            <View style={styles.headerRow}>
              <Text style={styles.modalHeader}>⚙️ Settings</Text>
              <Pressable onPress={() => navigation.navigate('Profile')}>
                <Image source={icons.Profile} style={styles.profileImage} />
              </Pressable>
            </View>

            {settingsTabs.map(tab => (
              <View key={tab}>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    if (tab === 'More Settings') toggleMoreDropdown();
                    else if (tab === 'Attributes' || tab === 'Category')
                      navigation.navigate('SettingsTabs');
                    else navigation.navigate(tab);
                  }}
                >
                  <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>{tab}</Text>
                    {tab === 'More Settings' && (
                      <Animated.View
                        style={{ transform: [{ rotate: rotateIcon }] }}
                      >
                        <Image
                          source={icons['Dropdown']}
                          style={styles.dropdownIcon}
                        />
                      </Animated.View>
                    )}
                  </View>
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
      <Tab.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const TabNavigator = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true },
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

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
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            marginHorizontal: 8,
            marginBottom: 4,
          },
          tabBarIcon: ({ focused }) => {
            const icon = icons[route.name];
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View
                  style={[
                    { padding: 8, borderRadius: 16 },
                    focused && { backgroundColor: 'rgba(27, 184, 58, 0.12)' },
                  ]}
                >
                  <Image
                    source={icon}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                      tintColor: focused ? '#1BB83A' : 'black',
                    }}
                  />
                </View>
              </View>
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

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={TabNavigator} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#E7EEE6',
    padding: 16,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalHeader: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  option: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: { fontSize: 16, color: '#333', width: 300 },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#333',
  },
  dropdownContainer: {
    backgroundColor: '#E7EEE6',
    borderRadius: 8,
    marginLeft: 24,
    marginRight: 16,
    width: '100%',
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
  dropdownOption: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownOptionText: { fontSize: 14, color: '#333', textAlign: 'center' },
});

export default AppNavigator;
