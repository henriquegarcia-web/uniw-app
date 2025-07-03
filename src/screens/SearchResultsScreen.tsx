// src/screens/SearchResultsScreen.tsx

import React from 'react'
import { StyleSheet, View } from 'react-native'

import {
  SearchResultsScreenProps,
  themeApp as theme,
  colors,
  IProduct,
} from '@papaya-punch/uniw-shared-modules'
import { mockProducts } from '@/types/products'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListingHeader } from '@/components/ListingHeader'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'
import { useSearch } from '@/contexts/SearchProvider'
import { useFocusEffect } from '@react-navigation/native'
import { Screen } from '@/components/Screen'
import { ProductCard } from '@/components/product/ProductCard'
import { globalStyles } from '@/styles/global'

const SearchResultsScreen = ({ navigation, route }: SearchResultsScreenProps) => {
  const { searchTerm: submittedSearchTerm } = route.params || {}

  const { processedProducts, sortOption, setSortOption, filters, setFilters } =
    useProcessedProducts(mockProducts, submittedSearchTerm ?? '')

  const { clearSearch } = useSearch()

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearSearch()
      }
    }, [clearSearch]),
  )

  const data = [...processedProducts]
  if (data.length % 2 !== 0) {
    data.push({ id: 'placeholder-item', empty: true } as any)
  }

  const renderItem = ({ item }: { item: IProduct & { empty?: boolean } }) => {
    if (item.empty) {
      return <View style={globalStyles.itemInvisible} />
    }

    return <ProductCard product={item} type="search" />
  }

  return (
    <Screen
      listing={{
        data: processedProducts,
        renderItem: renderItem,
        keyExtractor: (item) => item.id,
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
          <ListEmptyMessage
            message={`Nenhum produto encontrado para a busca: "${submittedSearchTerm}".`}
          />
        ),
      }}
      style={styles.container}
    />
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default SearchResultsScreen
