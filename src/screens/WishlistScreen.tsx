// src/screens/WishlistScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import {
  WishlistScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { ProductList } from '@/components/product/ProductList'
import { getProductsByIds } from '@/utils/mockGetters'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { ListingHeader } from '@/components/ListingHeader'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  const { user } = useClientAuth()

  const favoriteProducts = useMemo(() => {
    if (!user?.clientProfile?.favorites) return []
    return getProductsByIds(user.clientProfile.favorites)
  }, [user])

  const { processedProducts, sortOption, setSortOption, filters, setFilters } =
    useProcessedProducts(favoriteProducts)

  return (
    <SafeAreaView style={styles.container}>
      <ProductList
        type="wishlist"
        products={processedProducts}
        EmptyComponent={<ListEmptyMessage message={`Nenhum produto em seus favoritos`} />}
        HeaderComponent={
          <ListingHeader
            title="Meus favoritos"
            currentSort={sortOption}
            onSortChange={setSortOption}
            currentFilters={filters}
            onFiltersApply={setFilters}
          />
        }
      />
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
  },
})
export default WishlistScreen
