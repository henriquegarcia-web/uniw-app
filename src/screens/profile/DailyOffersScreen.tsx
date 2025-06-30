// src/screens/profile/DailyOffersScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import {
  DailyOffersScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'

const DailyOffersScreen = ({ navigation }: DailyOffersScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default DailyOffersScreen
