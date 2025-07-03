// src/screens/OrderSummaryScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  OrderSummaryScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const OrderSummaryScreen = ({ navigation }: OrderSummaryScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
      <Text>Tela de Ordem de Compra</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default OrderSummaryScreen
