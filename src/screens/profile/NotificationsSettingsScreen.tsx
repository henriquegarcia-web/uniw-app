// src/screens/profile/NotificationsSettingsScreen.tsx

import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView, Alert } from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form'

import {
  NotificationsSettingsScreenProps,
  INotificationSettings,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Switch } from '@/components/forms/Switch'
import { ProfileHeader } from '@/components/ProfileHeader'
import { Button } from '@/components/forms/Button'
import { useClientProfile } from '@/contexts/ClientProfileProvider'
import { Screen } from '@/components/Screen'

const NotificationsSettingsScreen = ({
  navigation,
}: NotificationsSettingsScreenProps) => {
  const { user, isLoadingAuthFunctions } = useClientAuth()
  const { updateNotificationSettings } = useClientProfile()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<INotificationSettings>({
    // Valores padrão caso o usuário ainda não tenha configurações salvas
    defaultValues: {
      promotions: { push: true, email: true, whatsapp: false },
      orderUpdates: { push: true, email: true, whatsapp: true },
      announcements: { push: true, email: false, whatsapp: false },
    },
  })

  // Efeito que carrega as configurações salvas do usuário no formulário
  useEffect(() => {
    if (user?.clientProfile?.notificationsSettings) {
      reset(user.clientProfile.notificationsSettings)
    }
  }, [user, reset])

  const handleSaveChanges = async (data: FieldValues) => {
    try {
      await updateNotificationSettings(data as INotificationSettings)
      Alert.alert('Sucesso!', 'Suas preferências de notificação foram salvas.')
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar suas preferências.')
    }
  }

  return (
    <Screen style={styles.container}>
      {/* Seção de Promoções */}
      <View style={styles.section}>
        <ProfileHeader title="Promoções e Ofertas" />
        <View style={styles.sectionWrapper}>
          <Controller
            control={control}
            name="promotions.push"
            render={({ field: { onChange, value } }) => (
              <Switch
                label="Notificações Push"
                description="Receba alertas de ofertas e cupons."
                onValueChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="promotions.email"
            render={({ field: { onChange, value } }) => (
              <Switch
                label="E-mail"
                description="Novidades e promoções semanais no seu e-mail."
                onValueChange={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>

      {/* Seção de Atualizações de Pedidos */}
      <View style={styles.section}>
        <ProfileHeader title="Atualizações de Pedidos" />
        <View style={styles.sectionWrapper}>
          <Controller
            control={control}
            name="orderUpdates.push"
            render={({ field: { onChange, value } }) => (
              <Switch
                label="Notificações Push"
                description="Status de envio, entrega e agendamentos."
                onValueChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="orderUpdates.whatsapp"
            render={({ field: { onChange, value } }) => (
              <Switch
                label="WhatsApp"
                description="Receba atualizações importantes pelo WhatsApp."
                onValueChange={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>

      {/* Seção de Avisos da Plataforma */}
      <View style={styles.section}>
        <ProfileHeader title="Avisos da Plataforma" />
        <View style={styles.sectionWrapper}>
          <Controller
            control={control}
            name="announcements.push"
            render={({ field: { onChange, value } }) => (
              <Switch
                label="Notificações Push"
                description="Avisos sobre sua conta e atualizações do app."
                onValueChange={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>

      {/* Botão de Salvar aparece no rodapé da tela */}
      <View style={styles.footer}>
        <Button
          title="Salvar Alterações"
          onPress={handleSubmit(handleSaveChanges)}
          loading={isLoadingAuthFunctions}
          disabled={!isDirty || isLoadingAuthFunctions}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  section: {
    rowGap: theme.spacing.xs,
  },
  sectionWrapper: {
    gap: theme.spacing.xs,
  },
  footer: {
    marginTop: theme.spacing.xs,
  },
})
export default NotificationsSettingsScreen
