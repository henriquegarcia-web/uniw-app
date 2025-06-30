// src/screens/CategoryListScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import {
  CategoryListScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { CategoryList } from '@/components/category/CategoriesList'
import { mockCategories } from '@/types/products'

const CategoryListScreen = ({ navigation }: CategoryListScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <CategoryList categories={mockCategories} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,

    // borderWidth: 1,
    // borderColor: 'red',
  },
})
export default CategoryListScreen
