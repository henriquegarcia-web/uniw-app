// src/screens/profile/AwardsScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  AwardsScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const AwardsScreen = ({ navigation }: AwardsScreenProps) => {
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
export default AwardsScreen
