// src/screens/CategoryListScreen.tsx

import React from 'react'
import { StyleSheet } from 'react-native'

import {
  CategoryListScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { mockCategories } from '@/types/products'
import { Screen } from '@/components/Screen'
import { CategoryCard } from '@/components/category/CategoryCard'

const CategoryListScreen = ({ navigation }: CategoryListScreenProps) => {
  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryDetails', { categoryId })
  }

  return (
    <Screen
      listing={{
        data: mockCategories,
        renderItem: ({ item }) => (
          <CategoryCard category={item} onPress={handleCategoryPress} />
        ),
        keyExtractor: (item) => item.id,
        numColumns: 2,
      }}
      type="tab"
      style={styles.container}
    />
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default CategoryListScreen
