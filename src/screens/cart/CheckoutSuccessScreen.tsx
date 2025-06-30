// src/screens/OrderSummaryScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import {
  CheckoutSuccessScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'

const CheckoutSuccessScreen = ({ navigation }: CheckoutSuccessScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Checkout com Sucesso</Text>
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
export default CheckoutSuccessScreen
