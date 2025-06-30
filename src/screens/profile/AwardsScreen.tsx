// src/screens/profile/AwardsScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import {
  AwardsScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'

const AwardsScreen = ({ navigation }: AwardsScreenProps) => {
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
export default AwardsScreen
