// src/navigation/AuthStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '@/screens/auth/SignInScreen'
import SignUpScreen from '@/screens/auth/SignUpScreen'
import ForgotPasswordScreen from '@/screens/auth/ForgotPasswordScreen'
import { AuthStackParamList } from '@uniw/shared-types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}
