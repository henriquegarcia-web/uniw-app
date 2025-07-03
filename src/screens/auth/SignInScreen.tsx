// src/screens/SignInScreen.tsx

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  SignInScreenProps,
  signInSchema,
  themeApp as theme,
  colors,
  SignInSchemaType,
} from '@papaya-punch/uniw-shared-modules'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { SocialIcon } from '@/components/SocialIcon'
import { ButtonIcon } from '@/components/forms/ButtonIcon'
import { Screen } from '@/components/Screen'

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { signIn, isLoadingAuthFunctions, isErrorAuth, errorAuth, clearAuthError } =
    useClientAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  })

  const handleSignIn = async (data: SignInSchemaType) => {
    await signIn(data)
  }

  return (
    <Screen
      enableInsets
      enableCenteredView
      enableKeyboardAvoiding
      style={styles.safeArea}
    >
      <View></View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bem</Text>
          <Text style={styles.title}>vindo(a)!</Text>
        </View>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              iconName="user"
              placeholder="Nome de usuário ou e-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              iconName="lock"
              placeholder="Digite sua senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isPassword
              error={errors.password?.message}
            />
          )}
        />

        {isErrorAuth && <Text style={styles.errorText}>{errorAuth.toString()}</Text>}

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <View style={styles.submitContainer}>
          <Button
            title="Login"
            variant="primary"
            onPress={handleSubmit(handleSignIn)}
            loading={isLoadingAuthFunctions}
            disabled={isLoadingAuthFunctions}
            style={{
              height: 50,
            }}
          />
        </View>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>- ou continue com -</Text>
        </View>

        <View style={styles.socialLoginContainer}>
          <ButtonIcon>
            <SocialIcon provider="google" />
          </ButtonIcon>
          <ButtonIcon>
            <SocialIcon provider="apple" />
          </ButtonIcon>
          <ButtonIcon>
            <SocialIcon provider="facebook" />
          </ButtonIcon>
        </View>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Criar uma conta </Text>
        <TouchableOpacity
          onPress={() => {
            clearAuthError()
            navigation.navigate('SignUp')
          }}
        >
          <Text style={styles.signUpLink}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  safeArea: {},
  content: {
    rowGap: theme.spacing.md,
  },
  titleContainer: {
    rowGap: 10,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxxl,
    lineHeight: theme.fonts.size.xxxl,
    color: colors.text.primary,
  },
  errorText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.semantic.error,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
    color: colors.brand.secondary,
  },
  submitContainer: {},
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  dividerText: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
    marginHorizontal: theme.spacing.md,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing.lg,
  },
  signUpText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
  },
  signUpLink: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: colors.brand.secondary,
    textDecorationLine: 'underline',
  },
})

export default SignInScreen
