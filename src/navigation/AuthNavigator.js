import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Role from '../(auth)/Role';
import SignUp from '../(auth)/SignUp';
import SignIn from '../(auth)/SignIn';
import ForgotPassword from '../(auth)/ForgotPassword';
import VerifyOtp from '../(auth)/VerifyOtp';
import SetNewPassword from '../(auth)/NewPassword';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Role" component={Role} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
