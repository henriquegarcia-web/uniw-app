// src/screens/PaymentScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  PaymentScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
      <Text>Tela de Pagamento</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default PaymentScreen
