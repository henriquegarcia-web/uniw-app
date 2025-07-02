import React from 'react'
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { themeApp } from '@papaya-punch/uniw-shared-modules'
import { useClientAuth } from '@/contexts/ClientAuthProvider'

type AvatarSize = 'sm' | 'md' | 'lg'

interface UserAvatarProps extends TouchableOpacityProps {
  size?: AvatarSize
}

const sizeStyles = {
  sm: {
    width: 28,
    height: 28,
  },
  md: {
    width: 36,
    height: 36,
  },
  lg: {
    width: 60,
    height: 60,
  },
}

export const UserAvatar = ({ size = 'md', ...rest }: UserAvatarProps) => {
  const { user } = useClientAuth()

  const userHasPhoto = !!user?.baseProfile?.photo
  const currentSize = sizeStyles[size]

  return (
    <TouchableOpacity {...rest}>
      {userHasPhoto ? (
        <Image
          source={{ uri: user.baseProfile.photo! }}
          style={[styles.avatar, currentSize]}
        />
      ) : (
        <Image
          source={require('@/assets/images/avatar.jpg')}
          style={[styles.avatarPlaceholder, currentSize]}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: themeApp.borders.radius.full,
  },
  avatarPlaceholder: {
    borderRadius: themeApp.borders.radius.full,
  },
})
