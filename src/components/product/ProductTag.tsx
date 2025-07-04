// src/components/ProductTag.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import {
  themeApp,
  colors,
  MaterialCommunityIconsIconType,
} from '@papaya-punch/uniw-shared-modules'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface ProductTagProps {
  label: string
  leftIcon?: MaterialCommunityIconsIconType
}

export const ProductTag = ({ label, leftIcon }: ProductTagProps) => {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={16}
          color={colors.text.tertiary}
          style={styles.icon}
        />
      )}

      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: themeApp.spacing.xs,
    paddingVertical: themeApp.spacing.xs,
    paddingHorizontal: themeApp.spacing.sm,
    borderRadius: themeApp.borders.radius.xxs,
    borderWidth: 1,
    borderColor: colors.text.tertiary,
  },
  label: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.sm,
    lineHeight: themeApp.fonts.size.sm,
    color: colors.text.tertiary,
  },
  icon: {},
})
