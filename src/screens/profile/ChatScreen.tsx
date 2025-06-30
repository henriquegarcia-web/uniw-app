// src/screens/profile/ChatScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import {
  ChatScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'

const ChatScreen = ({ navigation }: ChatScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    rowGap: theme.spacing.lg,
  },
})
export default ChatScreen
