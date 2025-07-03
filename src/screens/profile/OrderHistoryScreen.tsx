// src/screens/profile/OrderHistoryScreen.tsx

import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

import {
  OrderHistoryScreenProps,
  getOrderStatusData,
  IPurchaseOrder,
  themeApp as theme,
  colors,
  applyMask,
} from '@papaya-punch/uniw-shared-modules'
import { mockPurchaseHistory } from '@/types/auth'
import { ProfileHeader } from '@/components/ProfileHeader'
import { Screen } from '@/components/Screen'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const OrderHistoryScreen = ({ navigation }: OrderHistoryScreenProps) => {
  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetails', { orderId })
  }

  return (
    <Screen
      type="tab"
      listing={{
        data: mockPurchaseHistory,
        renderItem: ({ item }) => {
          return (
            <OrderHistoryCard order={item} onPress={() => handleOrderPress(item.id)} />
          )
        },
        keyExtractor: (item) => item.id,
        header: <ProfileHeader title="Histórico" />,
        empty: <ListEmptyMessage message={`Você ainda não fez nenhum pedido.`} />,
      }}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default OrderHistoryScreen

// =============================================================

interface OrderHistoryCardProps {
  order: IPurchaseOrder
  onPress: () => void
}

export const OrderHistoryCard = ({ order, onPress }: OrderHistoryCardProps) => {
  const firstItem = order.items[0]
  const statusInfo = getOrderStatusData(order.status)
  const orderDate = new Date(order.createdAt).toLocaleDateString('pt-BR')

  return (
    <TouchableOpacity
      style={orderHistoryCardstyles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Cabeçalho do Card */}
      <View style={orderHistoryCardstyles.header}>
        <View>
          <Text style={orderHistoryCardstyles.orderNumber}>
            Pedido #{order.orderNumber}
          </Text>
          <Text style={orderHistoryCardstyles.orderDate}>Realizado em: {orderDate}</Text>
        </View>
        <View
          style={[
            orderHistoryCardstyles.statusBadge,
            { backgroundColor: statusInfo.color },
          ]}
        >
          <Text style={orderHistoryCardstyles.statusText}>{statusInfo.label}</Text>
        </View>
      </View>

      {/* Conteúdo do Card */}
      <View style={orderHistoryCardstyles.content}>
        <Image
          source={{ uri: firstItem.imageUrl }}
          style={orderHistoryCardstyles.productImage}
        />
        <View style={orderHistoryCardstyles.productInfo}>
          <Text style={orderHistoryCardstyles.productName} numberOfLines={1}>
            {firstItem.productName}
          </Text>
          {order.items.length > 1 && (
            <Text style={orderHistoryCardstyles.moreItemsText}>
              + {order.items.length - 1} outro(s) item(ns)
            </Text>
          )}
        </View>
      </View>

      {/* Rodapé do Card */}
      <View style={orderHistoryCardstyles.footer}>
        <Text style={orderHistoryCardstyles.totalLabel}>Valor Total:</Text>
        <Text style={orderHistoryCardstyles.totalValue}>
          {applyMask(order.summary.totalAmount, 'currency')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const orderHistoryCardstyles = StyleSheet.create({
  card: {
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.ui.border,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
    paddingBottom: theme.spacing.sm,
  },
  orderNumber: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: colors.brand.secondary,
  },
  orderDate: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borders.radius.xs,
  },
  statusText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xs,
    color: colors.text.onBrand,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: theme.borders.radius.xs,
    marginRight: theme.spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
  },
  moreItemsText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
    paddingTop: theme.spacing.sm,
  },
  totalLabel: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
  },
  totalValue: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: colors.text.primary,
  },
})
