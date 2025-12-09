import React from 'react';
import {
    Text,
    StatusBar,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../constants/colors';

// Import Screens
import DashBoardScreen from '../(tabs)/DashBoard';
import Orders from '../(tabs)/OrderList';
import Analysis from '../(tabs)/Analytics';
import Products from '../(tabs)/Products';
import SettingsStackNavigator from './SettingsStackNavigator';

const Tab = createBottomTabNavigator();

// Main Tab Navigator
const MainTabNavigator = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: colors.tabBarActive,
                    tabBarInactiveTintColor: colors.tabBarInactive,
                    tabBarStyle: {
                        backgroundColor: colors.primary,
                        height: 70,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'DashBoard') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Orders') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (route.name === 'Products') {
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                        } else if (route.name === 'Analytics') {
                            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                        } else if (route.name === 'Setting') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return (
                            <Icon
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarLabel: ({ focused, color }) => (
                        <Text
                            style={{
                                fontSize: 12,
                                marginTop: 2,
                                fontWeight: focused ? '600' : '400',
                                color: color,
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
                <Tab.Screen name="Setting" component={SettingsStackNavigator} />
            </Tab.Navigator >
        </>
    );
};

export default MainTabNavigator;
