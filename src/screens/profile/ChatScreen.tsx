// src/screens/profile/ChatScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  ChatScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const ChatScreen = ({ navigation }: ChatScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default ChatScreen
