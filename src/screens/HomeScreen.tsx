// src/screens/HomeScreen.tsx

import React from 'react'
import { StyleSheet } from 'react-native'

import {
  HomeScreenProps,
  IBanner,
  isOfferBanner,
  isProductListBanner,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { CategoriesNavigator } from '@/components/category/CategoriesNavigator'
import { mockCategories } from '@/types/products'
import { mockBanners } from '@/types/banners'
import { OffersBanner } from '@/components/banners/OffersBanner'
import { ProductsBanner } from '@/components/banners/ProductsBanner'
import { Screen } from '@/components/Screen'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const renderBannerItem = ({ item }: { item: IBanner }) => {
    if (!item) return null

    if (isOfferBanner(item)) {
      return <OffersBanner banner={item} />
    }

    if (isProductListBanner(item)) {
      return <ProductsBanner banner={item} />
    }

    return null
  }

  return (
    <Screen
      listing={{
        header: <CategoriesNavigator categories={mockCategories} />,
        data: mockBanners,
        renderItem: renderBannerItem,
        keyExtractor: (item) => item.id,
        withoutSpacing: true,
      }}
      type="tab"
      style={styles.container}
    />
  )
}
const styles = StyleSheet.create({
  container: {},
})
export default HomeScreen
