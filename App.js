// App.js
import React, { useContext } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/(auth)/authContex';
import {Provider as PaperProvider} from 'react-native-paper';

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

const AppNavigator = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) return <LoaderScreen />;

  return (
    <NavigationContainer>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="dark-content"
        />
      )}
      {Platform.OS === 'ios' && <View style={{ height: 50 }} />}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
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

const App = () => (
  <AuthProvider>
    <PaperProvider>
    <AppNavigator />
    </PaperProvider>
  </AuthProvider>
);

export default App;
