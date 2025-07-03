// src/screens/support/ContactSupportScreen.tsx

import React, { useEffect } from 'react'
import { StyleSheet, Text, Alert } from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  ContactSupportScreenProps,
  themeApp as theme,
  colors,
  contactSupportSchema,
} from '@papaya-punch/uniw-shared-modules'
import { useHelpCenter } from '@/contexts/HelpCenterProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { Screen } from '@/components/Screen'

const ContactSupportScreen = ({ navigation, route }: ContactSupportScreenProps) => {
  const { orderId } = route.params
  const { submitSupportTicket, isLoading } = useHelpCenter()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSupportSchema),
    defaultValues: { subject: '', message: '', orderId: '' },
  })

  useEffect(() => {
    if (orderId) {
      setValue('orderId', orderId)
      setValue('subject', `Dúvida sobre o pedido #${orderId}`)
    }
  }, [orderId, setValue])

  const onSubmit = async (data: FieldValues) => {
    try {
      await submitSupportTicket(
        data as { subject: string; message: string; orderId?: string },
      )
      Alert.alert('Enviado!', 'Sua solicitação foi enviada. Responderemos em breve.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar sua solicitação. Tente novamente.')
    }
  }

  return (
    <Screen enableKeyboardAvoiding style={styles.container}>
      <Text style={styles.title}>Fale Conosco</Text>
      <Text style={styles.subtitle}>
        Descreva seu problema ou dúvida e nossa equipe responderá o mais rápido possível.
      </Text>

      {orderId && (
        <InputText label="Pedido Relacionado" value={`#${orderId}`} editable={false} />
      )}

      <Controller
        control={control}
        name="subject"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Assunto"
            placeholder="Ex: Problema com a entrega"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.subject?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="message"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Mensagem"
            placeholder="Descreva sua dúvida ou problema com detalhes..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.message?.message}
            multiline
            numberOfLines={5}
            style={{ height: 120, textAlignVertical: 'top' }}
          />
        )}
      />

      <Button
        title="Enviar Solicitação"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={{ marginTop: theme.spacing.md }}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
})

export default ContactSupportScreen
