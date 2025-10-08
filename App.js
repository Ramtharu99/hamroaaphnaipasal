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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        if (storedToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        // Give some time for splash/loading screen
        setTimeout(() => setLoading(false), 1500);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <NavigationContainer>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1BB83A"
          translucent={false}
        />
      )}
      {Platform.OS === 'ios' && (
        <View style={{ height: 50, backgroundColor: '#1BB83A' }} />
      )}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // 🔹 User is logged in
          <>
            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          // 🔹 User is not logged in
          <>
            <Stack.Screen name="Role" component={Role} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
