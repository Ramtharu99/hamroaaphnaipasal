import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from './src/(tabs)/TabNavigator';
import Profile from './src/(tabs)/Setting';
import LoaderScreen from './src/components/LoadingScreen';
import Role from './src/(auth)/Role';
import SignUp from './src/(auth)/SignUp';
import SignIn from "./src/(auth)/SignIn";
import ForgotPassword from "./src/(auth)/ForgotPassword";
import { StatusBar } from 'react-native';
import VerifyOtp from "./src/(auth)/VerifyOtp";
import NewPassword from "./src/(auth)/NewPassword";

const App = () => {
  const Stack = createNativeStackNavigator();

  const NavigationScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName="LoaderScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <NavigationScreen />
    </NavigationContainer>
  );
};

export default App;