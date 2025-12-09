import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomHeader from '../components/CustomHeader';
import SettingsTopTabNavigator from '../navigation/SettingsTopTabNavigator';
import colors from '../constants/colors';
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
import { List } from 'react-native-paper';


const SettingsHome = ({ navigation }) => {

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
        'Profile',
    ];

    const [expanded, setExpanded] = useState(false);

    return (
        <SafeAreaView style={styles.modalContent}>
            <CustomHeader
                title="Settings"
                leftType="none"
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person-circle-outline" size={32} color={colors.primary} />
                    </TouchableOpacity>
                }
            />

            {settingsTabs.map((tab) => (
                <View key={tab}>
                    {tab !== 'More Settings' ? (

                        // Normal row
                        <TouchableOpacity
                            style={styles.optionContainer}
                            onPress={() => navigation.navigate(tab)}
                        >
                            <Text style={styles.optionText}>{tab + " "}</Text>
                            <Icon
                                name="chevron-forward-outline"
                                size={20}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>

                    ) : (

                        // PAPER ACCORDION FOR MORE SETTINGS
                        // PAPER ACCORDION FOR MORE SETTINGS
                        <List.Section style={{ backgroundColor: 'white' }}>
                            <List.Accordion
                                title="More Settings"
                                expanded={expanded}
                                onPress={() => setExpanded(!expanded)}
                                titleStyle={{
                                    fontSize: 16,
                                    color: 'black',
                                }}
                                style={{
                                    backgroundColor: 'white',
                                }}
                            >
                                {moreOptions.map((option) => (
                                    <List.Item
                                        key={option}
                                        title={option}
                                        onPress={() => {
                                            setExpanded(false);
                                            navigation.navigate(option);
                                        }}
                                        titleStyle={{
                                            fontSize: 14,
                                            color: 'black',
                                        }}
                                        style={{
                                            backgroundColor: 'white',
                                        }}
                                    />
                                ))}
                            </List.Accordion>
                        </List.Section>

                    )}
                </View>
            ))}
        </SafeAreaView>
    );
};




// ------------------------------------
// Main Stack Navigator
// ------------------------------------
const SettingsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SettingsHome" component={SettingsHome} />

            <Stack.Screen name="SettingsTabs" component={SettingsTopTabNavigator} />
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


// ------------------------------------
// Styles
// ------------------------------------
const styles = StyleSheet.create({
    modalContent: { flex: 1, backgroundColor: colors.background },

    optionText: {
        fontSize: 16,
        color: colors.textSecondary,
        flexShrink: 1,
    },

    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    dropdownContainer: {
        marginLeft: 24,
        marginTop: 4,
        backgroundColor: colors.background,
        borderRadius: 8,
        overflow: 'hidden',
    },

    dropdownOption: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    dropdownOptionText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});

export default SettingsStackNavigator;
