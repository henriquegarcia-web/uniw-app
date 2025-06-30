// src/screens/OrderSummaryScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import {
  OrderSummaryScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'

const OrderSummaryScreen = ({ navigation }: OrderSummaryScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Ordem de Compra</Text>
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
export default OrderSummaryScreen
