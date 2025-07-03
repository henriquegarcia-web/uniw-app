// src/screens/OrderSummaryScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  CheckoutSuccessScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const CheckoutSuccessScreen = ({ navigation }: CheckoutSuccessScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
      <Text>Tela de Checkout com Sucesso</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default CheckoutSuccessScreen
