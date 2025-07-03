// src/screens/profile/NotificationDetailsScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
  NotificationDetailsScreenProps,
  AppStackParamList,
  getNotificationTypeData,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { Button } from '@/components/forms/Button'
import { getNotificationById } from '@/utils/mockGetters'
import { Screen } from '@/components/Screen'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const NotificationDetailsScreen = ({ route }: NotificationDetailsScreenProps) => {
  const { notificationId } = route.params
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  // Busca os dados da notificação específica
  const notification = useMemo(
    () => getNotificationById(notificationId),
    [notificationId],
  )

  if (!notification) {
    return (
      <Screen type="tab" style={styles.container}>
        <ListEmptyMessage message="Notificação não encontrada." />
      </Screen>
    )
  }

  const typeData = getNotificationTypeData(notification.type)
  const notificationDate = new Date(notification.createdAt).toLocaleString('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const handleLinkPress = () => {
    if (notification?.data) {
      const { screen, params } = notification.data
      navigation.navigate(screen as any, params as any)
    }
  }

  return (
    <Screen type="tab" style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: typeData.color }]}>
          <MaterialCommunityIcons name={typeData.icon} size={28} color="white" />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.date}>{notificationDate}</Text>
        </View>
      </View>

      <Text style={styles.content}>{notification.message}</Text>

      {notification.data && (
        <Button
          title="Ver Mais Detalhes"
          onPress={handleLinkPress}
          style={{ marginTop: theme.spacing.xs }}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
  },
  date: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
  },
  content: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 24,
    color: colors.text.primary,
    marginTop: theme.spacing.xs,
  },
})

export default NotificationDetailsScreen
