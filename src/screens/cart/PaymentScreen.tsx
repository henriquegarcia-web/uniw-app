// src/screens/PaymentScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import {
  PaymentScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Pagamento</Text>
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
export default PaymentScreen
