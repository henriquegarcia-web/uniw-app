// src/navigation/OnBoardingStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OnboardingScreen from '@/screens/OnboardingScreen'
import { OnboardingStackParamList } from '@uniw/shared-types'

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

export function OnBoardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  )
}
