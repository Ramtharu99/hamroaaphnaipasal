import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StoreInformation from '../screens/StoreInformation';
import Policies from '../screens/Policies';
import colors from '../constants/colors';

const TopTab = createMaterialTopTabNavigator();

const SettingsTopTabNavigator = () => {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: colors.background },
                tabBarIndicatorStyle: { backgroundColor: colors.primary },
            }}
        >
            <TopTab.Screen name="Attributes" component={StoreInformation} />
            <TopTab.Screen name="Category" component={Policies} />
        </TopTab.Navigator>
    );
};

export default SettingsTopTabNavigator;
