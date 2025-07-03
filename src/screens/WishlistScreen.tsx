// src/screens/WishlistScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import {
  WishlistScreenProps,
  themeApp as theme,
  colors,
  IProduct,
} from '@papaya-punch/uniw-shared-modules'
import { getProductsByIds } from '@/utils/mockGetters'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { ListingHeader } from '@/components/ListingHeader'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'
import { Screen } from '@/components/Screen'
import { ProductCard } from '@/components/product/ProductCard'
import { globalStyles } from '@/styles/global'

const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  const { user } = useClientAuth()

  const favoriteProducts = useMemo(() => {
    if (!user?.clientProfile?.favorites) return []
    return getProductsByIds(user.clientProfile.favorites)
  }, [user])

  const { processedProducts, sortOption, setSortOption, filters, setFilters } =
    useProcessedProducts(favoriteProducts)

  const data = [...processedProducts]
  if (data.length % 2 !== 0) {
    data.push({ id: 'placeholder-item', empty: true } as any)
  }

  const renderItem = ({ item }: { item: IProduct & { empty?: boolean } }) => {
    if (item.empty) {
      return <View style={globalStyles.itemInvisible} />
    }

    return <ProductCard product={item} type="wishlist" />
  }

  return (
    <Screen
      type="tab"
      style={styles.container}
      listing={{
        data: processedProducts,
        renderItem: renderItem,
        keyExtractor: (item) => item.id,
        header: (
          <ListingHeader
            title="Meus favoritos"
            currentSort={sortOption}
            onSortChange={setSortOption}
            currentFilters={filters}
            onFiltersApply={setFilters}
          />
        ),
        empty: <ListEmptyMessage message={`Nenhum produto em seus favoritos.`} />,
      }}
    />
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default WishlistScreen
