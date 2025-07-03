// src/screens/profile/DailyOffersScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  DailyOffersScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const DailyOffersScreen = ({ navigation }: DailyOffersScreenProps) => {
  return (
    <Screen style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default DailyOffersScreen
