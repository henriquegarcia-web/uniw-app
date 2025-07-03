// src/screens/CartScreen.tsx

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import {
  CartScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Screen } from '@/components/Screen'

const CartScreen = ({ navigation }: CartScreenProps) => {
  return (
    <Screen type="tab" style={styles.container}>
      <Text>Tela do Carrinho</Text>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default CartScreen
