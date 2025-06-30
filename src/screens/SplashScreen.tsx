// src/screens/SplashScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import { globalStyles } from '@/styles/global'
import { themeApp as theme, colors } from '@papaya-punch/uniw-shared-modules'

const SplashScreen = () => {
  return <SafeAreaView style={styles.safeArea}></SafeAreaView>
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.ui.background,
  },
})

export default SplashScreen
