// src/screens/profile/ChangeLanguageScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  ChangeLanguageScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const ChangeLanguageScreen = ({ navigation }: ChangeLanguageScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
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
export default ChangeLanguageScreen
