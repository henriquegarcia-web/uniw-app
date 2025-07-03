// src/components/UserTag.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import {
  themeApp,
  colors,
  MaterialCommunityIconsIconType,
} from '@papaya-punch/uniw-shared-modules'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface UserTagProps {
  label: string
  icon?: MaterialCommunityIconsIconType
}

export const UserTag = ({ label, icon }: UserTagProps) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={14}
          color={colors.text.secondary}
          style={styles.icon}
        />
      )}

      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    // paddingVertical: themeApp.spacing.xs,
    paddingHorizontal: themeApp.spacing.xs,
    borderRadius: themeApp.borders.radius.xs,
    borderWidth: 1,
    borderColor: colors.text.secondary,
  },
  label: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.xs,
    lineHeight: themeApp.fonts.size.xs,
    color: colors.text.secondary,
  },
  icon: {},
})
