import React, { useContext } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../(auth)/authContex';
import LoaderScreen from '../components/LoadingScreen';
import colors from '../constants/colors';

// Navigators
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    // const { isLoggedIn, loading } = useContext(AuthContext);
    const isLoggedIn = true;
    const loading = false;

    // if (loading) return <LoaderScreen />;

    return (
        <NavigationContainer>
            {Platform.OS === 'android' && (
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={isLoggedIn ? colors.white : "transparent"}
                />
            )}
            {Platform.OS === 'ios' && <View style={{ height: 50 }} />}

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <Stack.Screen name="App" component={TabNavigator} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
