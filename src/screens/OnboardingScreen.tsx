// src/screens/OnBoardingScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
  View,
  StatusBar,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import {
  OnboardingScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from '@/components/forms/Button'

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { completeOnboarding } = useClientAuth()

  const handleStart = () => {
    completeOnboarding()
  }

  return (
    <ImageBackground
      source={require('@/assets/backgrounds/onboarding-background.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Unindo clientes e negócios!</Text>
          <Text style={styles.subtitle}>Encontre seu produto, compre agora!</Text>

          <View>
            <Button title="Iniciar" variant="secondary" onPress={handleStart} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  safeArea: {
    zIndex: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  contentContainer: {
    maxWidth: 280,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xxl,
    color: colors.ui.background,
  },
  subtitle: {
    color: colors.ui.background,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
})

export default OnboardingScreen
