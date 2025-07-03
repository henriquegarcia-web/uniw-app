// src/screens/CategoryDetailScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import {
  CategoryDetailsScreenProps,
  themeApp as theme,
  colors,
  IProduct,
} from '@papaya-punch/uniw-shared-modules'
import { getCategoryById, getProductsByCategoryId } from '@/utils/mockGetters'
import { ListingHeader } from '@/components/ListingHeader'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'
import { Screen } from '@/components/Screen'
import { ProductCard } from '@/components/product/ProductCard'
import { globalStyles } from '@/styles/global'

const CategoryDetailsScreen = ({ navigation, route }: CategoryDetailsScreenProps) => {
  const { categoryId } = route.params

  // const categoryData = useMemo(() => {
  //   const data = getCategoryById(categoryId)
  //   return data
  // }, [categoryId])

  const categoryProducts = useMemo(() => {
    const data = getProductsByCategoryId(categoryId)
    return data
  }, [categoryId])

  const { processedProducts, filters, setFilters, sortOption, setSortOption } =
    useProcessedProducts(categoryProducts)

  const data = [...processedProducts]
  if (data.length % 2 !== 0) {
    data.push({ id: 'placeholder-item', empty: true } as any)
  }

  const renderItem = ({ item }: { item: IProduct & { empty?: boolean } }) => {
    if (item.empty) {
      return <View style={globalStyles.itemInvisible} />
    }

    return <ProductCard product={item} type="category" />
  }

  return (
    <Screen
      listing={{
        data: data,
        renderItem: renderItem,
        keyExtractor: (item) => item.id,
        numColumns: 2,
        header: (
          <ListingHeader
            title="Todos"
            currentSort={sortOption}
            onSortChange={setSortOption}
            currentFilters={filters}
            onFiltersApply={setFilters}
          />
        ),
        empty: (
          <ListEmptyMessage message={`Nenhum produto encontrado para esta categoria.`} />
        ),
      }}
      type="tab"
      style={styles.container}
    />
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default CategoryDetailsScreen
