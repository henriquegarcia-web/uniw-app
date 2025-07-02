// src/components/SideMenu.tsx

import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useMenu } from '@/contexts/MenuProvider'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import {
  themeApp,
  colors,
  MainTabParamList,
  MaterialCommunityIconsIconType,
} from '@papaya-punch/uniw-shared-modules'
import { navigate } from '@/services/navigation'
import { UserAvatar } from './UserAvatar'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')
const MENU_WIDTH = width * 0.65
const HEADER_HEIGHT = MENU_WIDTH * (1 / 2)

interface MenuItem {
  id: string
  label: string
  icon: MaterialCommunityIconsIconType
  onPress: () => void
}

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

  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Meu Perfil',
      icon: 'account-outline',
      onPress: () => navigateAndClose('ProfileStack', { screen: 'Profile' }),
    },
    {
      id: 'offers',
      label: 'Ofertas',
      icon: 'tag-outline',
      onPress: () => navigateAndClose('DailyOffers'),
    },
    {
      id: 'order-history',
      label: 'Meus Pedidos',
      icon: 'history',
      onPress: () => navigateAndClose('ProfileStack', { screen: 'OrderHistory' }),
    },
    {
      id: 'notifications',
      label: 'Notificações',
      icon: 'bell-outline',
      onPress: () => navigateAndClose('ProfileStack', { screen: 'Notifications' }),
    },
    {
      id: 'loyalty-program',
      label: 'Fidelidade',
      icon: 'handshake-outline',
      onPress: () => navigateAndClose('ProfileStack', { screen: 'LoyaltyProgram' }),
    },
    {
      id: 'club',
      label: 'Clube',
      icon: 'crown-outline',
      onPress: () => navigateAndClose('ProfileStack', { screen: 'Club' }),
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: 'cog-outline',
      onPress: () => navigateAndClose('ProfileStack', { screen: 'Settings' }),
    },
  ]

  if (!isOpen) {
    return null
  }

  return (
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu}>
      <Animated.View
        style={[styles.menuContainer, { transform: [{ translateX: position }] }]}
      >
        <SafeAreaView style={styles.menuWrapper} edges={['bottom']}>
          <View style={styles.menuHeader}>
            <Image
              source={require('@/assets/backgrounds/side-menu-background-1.png')}
              style={styles.logo}
            />

            <View style={styles.menuHeaderContent}>
              <UserAvatar
                size="lg"
                onPress={() => navigateAndClose('ProfileStack', { screen: 'Profile' })}
              />
              <View style={styles.menuHeaderInfos}>
                <Text style={styles.menuHeaderUserName} numberOfLines={1}>
                  {user?.baseProfile?.name}
                </Text>
                <View style={styles.menuHeaderUserPoints}>
                  <MaterialCommunityIcons
                    name="star-circle"
                    size={16}
                    color={colors.text.onBrand}
                    style={{
                      marginBottom: 2,
                    }}
                  />
                  <Text style={styles.menuHeaderUserPointsValue}>
                    {user?.clientProfile?.loyalty.pointsBalance}
                  </Text>
                  <Text
                    style={[
                      styles.menuHeaderUserPointsValue,
                      styles.menuHeaderUserPointsLabel,
                    ]}
                  >
                    pontos
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.menuItems}>
            {menuItems.map((menu) => {
              return (
                <TouchableOpacity
                  key={menu.id}
                  style={styles.menuItem}
                  onPress={menu.onPress}
                >
                  <MaterialCommunityIcons
                    name={menu.icon}
                    size={22}
                    color={colors.text.primary}
                  />
                  <Text style={styles.menuItemText}>{menu.label}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={22}
              color={colors.semantic.error}
            />
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
  },
  menuWrapper: {
    flex: 1,
  },
  menuHeader: {
    position: 'relative',
    height: HEADER_HEIGHT,
  },
  menuHeaderContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: themeApp.spacing.sm,
    paddingLeft: 25,
    paddingRight: 20,
    paddingTop: 14,
  },
  menuHeaderInfos: {
    width: MENU_WIDTH - 130,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  menuHeaderUserName: {
    // flex: 1,
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.onBrand,

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  menuHeaderUserPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  menuHeaderUserPointsValue: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.sm,
    color: colors.text.onBrand,
  },
  menuHeaderUserPointsLabel: {
    opacity: 0.8,
  },
  logo: {
    width: '100%',
    height: '100%',
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
    height: 75,
    paddingLeft: themeApp.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
  },
})
