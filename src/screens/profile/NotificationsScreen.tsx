// src/screens/profile/NotificationsScreen.tsx

import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
  NotificationsScreenProps,
  INotification,
  getNotificationTypeData,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { mockNotifications } from '@/types/notifications'
import { ProfileHeader } from '@/components/ProfileHeader'
import { Screen } from '@/components/Screen'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

// --- Subcomponente para cada item da lista ---
const NotificationItem = ({
  notification,
  onPress,
}: {
  notification: INotification
  onPress: () => void
}) => {
  const typeData = getNotificationTypeData(notification.type)

  return (
    <TouchableOpacity
      style={[styles.itemContainer, !notification.read && styles.unreadItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: typeData.color }]}>
        <MaterialCommunityIcons name={typeData.icon} size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {notification.message}
        </Text>
      </View>
      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  )
}

// --- Componente Principal da Tela ---
const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  // Em um app real, este estado viria de um contexto ou API
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleNotificationPress = (notification: INotification) => {
    // Marca a notificação como lida ao ser clicada
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, isRead: true } : n,
    )
    setNotifications(updatedNotifications)

    // Navega para a tela de detalhes
    navigation.navigate('NotificationDetails', { notificationId: notification.id })
  }

  return (
    <Screen
      type="tab"
      listing={{
        data: notifications,
        renderItem: ({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        ),
        keyExtractor: (item: INotification) => item.id,
        header: <ProfileHeader title="Caixa de Entrada" />,
        empty: <ListEmptyMessage message={`Nenhuma notificação por aqui.`} />,
      }}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.borders.radius.sm,
    backgroundColor: colors.ui.background,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  unreadItem: {
    backgroundColor: '#F7F4FF', // Um fundo sutil para não lidas
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
  },
  body: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brand.secondary,
    marginLeft: theme.spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.ui.border,
    marginLeft: theme.spacing.lg + 44 + theme.spacing.md, // Alinha com o texto
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fonts.size.lg,
    color: colors.text.secondary,
  },
})

export default NotificationsScreen
