// src/screens/profile/ChatsListScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  ChatsListScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const ChatsListScreen = ({ navigation }: ChatsListScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default ChatsListScreen
