// src/components/SectionHeader.tsx

import React from 'react'
import { StyleSheet, TouchableOpacityProps, View, Text } from 'react-native'

import { themeApp, colors } from '@papaya-punch/uniw-shared-modules'

interface SectionHeaderProps extends TouchableOpacityProps {
  title?: string
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  if (!title || title === '') return null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: themeApp.spacing.sm,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.xl,
    paddingTop: 2,
  },
})
