import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import DashBoard from './src/(tabs)/TabNavigator';
import Profile from './src/(tabs)/Setting';
import LoaderScreen from './src/components/LoadingScreen';
import Role from './src/(auth)/Role';
import SignUp from './src/(auth)/SignUp';
import SignIn from './src/(auth)/SignIn';
import ForgotPassword from './src/(auth)/ForgotPassword';
import VerifyOtp from './src/(auth)/VerifyOtp';
import SetNewPassword from './src/(auth)/NewPassword';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        setToken(storedToken);
      } catch (error) {
        console.log('Error checking token:', error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#1BB83A"
          translucent={false}
        />
      )}
      {Platform.OS === 'ios' && (
        <View style={{ height: 50, backgroundColor: '#1BB83A' }} />
      )}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading && (
          <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
        )}

        {/* Auth flow */}
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
        <Stack.Screen name="SetNewPassword" component={SetNewPassword} />

        {/* App flow */}
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
