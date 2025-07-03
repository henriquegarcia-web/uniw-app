// src/screens/profile/AddNewAddressScreen.tsx

import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  AddNewAddressScreenProps,
  IAddress,
  IIBGEState,
  IIBGECity,
  themeApp as theme,
  colors,
  applyMask,
  addAddressSchema,
  ibgeService,
  viacepService,
} from '@papaya-punch/uniw-shared-modules'
import { useClientProfile } from '@/contexts/ClientProfileProvider'

import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { Switch } from '@/components/forms/Switch'
import { Dropdown, DropdownItem } from '@/components/forms/Dropdown'
import { Screen } from '@/components/Screen'

const AddNewAddressScreen = ({ navigation }: AddNewAddressScreenProps) => {
  const { addAddress, isProfileLoading } = useClientProfile()

  const [states, setStates] = useState<DropdownItem[]>([])
  const [cities, setCities] = useState<DropdownItem[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isCepLoading, setIsCepLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(addAddressSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
      isDefault: false,
    },
  })

  const watchedState = watch('state')

  useEffect(() => {
    ibgeService
      .getStates()
      .then((data) =>
        setStates(data.map((s: IIBGEState) => ({ label: s.nome, value: s.sigla }))),
      )
  }, [])

  useEffect(() => {
    if (watchedState) {
      setIsLoadingCities(true)
      ibgeService
        .getCitiesByState(watchedState)
        .then((data) =>
          setCities(data.map((c: IIBGECity) => ({ label: c.nome, value: c.nome }))),
        )
        .finally(() => setIsLoadingCities(false))
    }
  }, [watchedState])

  const handleCepBlur = async (cep: string) => {
    if (cep?.length === 9) {
      setIsCepLoading(true)
      try {
        const endereco = await viacepService.getAddressByCep(cep)
        if (!endereco.erro) {
          setValue('street', endereco.logradouro, { shouldValidate: true })
          setValue('neighborhood', endereco.bairro, { shouldValidate: true })
          setValue('state', endereco.uf, { shouldValidate: true })
          setValue('city', endereco.localidade, { shouldValidate: true })
        }
      } finally {
        setIsCepLoading(false)
      }
    }
  }

  const handleSaveAddress = async (data: FieldValues) => {
    try {
      await addAddress(data as Omit<IAddress, 'id'>)
      Alert.alert('Sucesso!', 'Seu novo endereço foi salvo.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar o endereço.')
    }
  }

  return (
    <Screen type="tab" enableKeyboardAvoiding style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Nome do Endereço"
            placeholder="Ex: Casa, Trabalho"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
      />

      <View style={styles.cepContainer}>
        <Controller
          control={control}
          name="cep"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="CEP"
              placeholder="00000-000"
              onBlur={() => handleCepBlur(value)}
              onChangeText={(text) => onChange(applyMask(text, 'cep'))}
              value={value}
              keyboardType="numeric"
              maxLength={9}
              error={errors.cep?.message}
            />
          )}
        />
        {isCepLoading && <ActivityIndicator style={styles.cepLoading} />}
      </View>

      <View style={styles.row}>
        <Controller
          control={control}
          name="street"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Rua"
              placeholder="Ex: Rua das Flores"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.street?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="number"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Número"
              placeholder="Ex: 123"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.number?.message}
              width={30}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="neighborhood"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Bairro"
            placeholder="Seu bairro"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.neighborhood?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="state"
        render={({ field: { onChange, value } }) => (
          <Dropdown
            label="Estado"
            items={states}
            value={value}
            onValueChange={onChange}
            error={errors.state?.message}
            placeholder="Selecione seu estado"
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, value } }) => (
          <Dropdown
            label="Cidade"
            items={cities}
            value={value}
            onValueChange={onChange}
            error={errors.city?.message}
            placeholder="Selecione sua cidade"
            disabled={!watchedState || isLoadingCities}
          />
        )}
      />

      <Controller
        control={control}
        name="complement"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Complemento (Opcional)"
            placeholder="Ex: Apto 101, Bloco B"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="isDefault"
        render={({ field: { onChange, value } }) => (
          <Switch
            label="Definir como endereço padrão"
            description="Este endereço será usado para futuras compras."
            onValueChange={onChange}
            value={value}
          />
        )}
      />

      <Button
        title="Salvar Endereço"
        variant="primary"
        onPress={handleSubmit(handleSaveAddress)}
        loading={isProfileLoading}
        disabled={!isDirty || isProfileLoading}
        style={styles.button}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cepLoading: {
    marginLeft: theme.spacing.sm,
    position: 'absolute',
    right: 16,
    top: 40,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
})

export default AddNewAddressScreen
