// src/components/SideMenu.tsx

import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useMenu } from '@/contexts/MenuProvider'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { themeApp, colors, MainTabParamList } from '@papaya-punch/uniw-shared-modules'
import { navigate } from '@/services/navigation'

const { width } = Dimensions.get('window')
const MENU_WIDTH = width * 0.8

export const SideMenu = () => {
  const { isOpen, closeMenu } = useMenu()
  const { user, signOut } = useClientAuth()

  const position = useRef(new Animated.Value(-MENU_WIDTH)).current

  useEffect(() => {
    Animated.timing(position, {
      toValue: isOpen ? 0 : -MENU_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isOpen, position])

  const navigateAndClose = (
    name: keyof MainTabParamList,
    params?: MainTabParamList[keyof MainTabParamList],
  ) => {
    navigate(name, params)
    closeMenu()
  }

  const handleSignOut = () => {
    closeMenu()
    signOut()
  }

  if (!isOpen) {
    return null
  }

  return (
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu}>
      <Animated.View
        style={[styles.menuContainer, { transform: [{ translateX: position }] }]}
      >
        <View style={styles.menuHeader}>
          <Image
            source={require('@/assets/backgrounds/side-menu-background-1.png')}
            style={styles.logo}
            // resizeMode="contain"
          />
        </View>
        <SafeAreaView style={styles.menuWrapper}>
          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'Profile' })}
            >
              <Feather name="user" size={22} color={colors.text.primary} />
              <Text style={styles.menuItemText}>Meu Perfil</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'Wishlist' })}
            >
              <Feather name="heart" size={22} color={colors.text.primary} />
              <Text style={styles.menuItemText}>Favoritos</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'OrderHistory' })}
            >
              <Feather name="shopping-bag" size={22} color={colors.text.primary} />
              <Text style={styles.menuItemText}>Meus Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'Settings' })}
            >
              <Feather name="settings" size={22} color={colors.text.primary} />
              <Text style={styles.menuItemText}>Configurações</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Feather name="log-out" size={22} color={colors.semantic.error} />
            <Text style={[styles.menuItemText, { color: colors.semantic.error }]}>
              Sair
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: MENU_WIDTH,
    backgroundColor: colors.ui.background,
    // paddingTop: themeApp.spacing.custom['phone-default-header'],
  },
  menuWrapper: {
    flex: 1,
  },
  menuHeader: {
    // position: 'relative',
    height: 200,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.brand.secondary,
  },
  logo: {
    // zIndex: 1000,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: '100%',
    height: '100%',
    // width: 80,
  },
  menuItems: {
    flex: 1,
    padding: themeApp.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: themeApp.spacing.md,
  },
  menuItemText: {
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.md,
    marginLeft: themeApp.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: themeApp.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
  },
})
