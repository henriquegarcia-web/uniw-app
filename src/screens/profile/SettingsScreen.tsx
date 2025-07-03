// src/screens/profile/SettingsScreen.tsx

import React from 'react'
import { StyleSheet } from 'react-native'

import {
  SettingsScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { ProfileMenu, ProfileMenuItem } from './ProfileScreen'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Screen } from '@/components/Screen'

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { signOut } = useClientAuth()

  return (
    <Screen type="tab" style={styles.container}>
      <ProfileMenu sectionTitle="Minha conta" type="list">
        {/* <ProfileMenuItem label="Editar perfil" screen="EditProfile" /> */}
        <ProfileMenuItem label="Alterar telefone" screen="ChangePhone" />
        <ProfileMenuItem label="Alterar e-mail" screen="ChangeEmail" />
        <ProfileMenuItem label="Alterar senha" screen="ChangePassword" />
        <ProfileMenuItem label="Meus endereços" screen="MyAddresses" />
        <ProfileMenuItem label="Cartões salvos" screen="MyCards" />
      </ProfileMenu>

      <ProfileMenu sectionTitle="Definições" type="list">
        <ProfileMenuItem
          label="Configurações de notificação"
          screen="NotificationsSettings"
        />
        {/* <ProfileMenuItem label="Idioma" screen="ChangeLanguage" /> */}
      </ProfileMenu>

      <ProfileMenu sectionTitle="Suporte" type="list">
        <ProfileMenuItem label="Central de Ajuda" appScreen="HelpCenter" />
        <ProfileMenuItem label="Políticas da UNIW" appScreen="Policies" />
        <ProfileMenuItem label="Feliz com a UNIW? Avalie-nos!" onPress={() => {}} />
        <ProfileMenuItem label="Sobre nós" appScreen="AboutUs" />
        <ProfileMenuItem label="Solicitar exclusão de conta" appScreen="DeleteAccount" />
      </ProfileMenu>

      <ProfileMenuItem type="negative" label="Sair" onPress={signOut} />
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default SettingsScreen
