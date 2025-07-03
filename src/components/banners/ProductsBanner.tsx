// src/components/banners/ProductsBanner.tsx

import React from 'react'
import {
  BannerType,
  IProductBanner,
  IProductFeaturedBanner,
  IProductListBanner,
  themeApp,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { getProductById, getProductsByIds } from '@/utils/mockGetters'
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { ProductCard } from '../product/ProductCard'
import { SectionHeader } from '../SectionHeader'
import { CtaButton } from '../forms/CtaButton'

const { width } = Dimensions.get('window')

type ProductsBannerProps = {
  banner: IProductBanner
}

export const ProductsBanner = ({ banner }: ProductsBannerProps) => {
  switch (banner.type) {
    case BannerType.PRODUCT_SCROLL:
      return <ProductScroll data={banner} />

    case BannerType.PRODUCT_FEATURED:
      return <ProductFeatured data={banner} />

    default:
      return null
  }
}

// ================================================================

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const GAP_SIZE = themeApp.spacing.xs
const USABLE_WIDTH = SCREEN_WIDTH - themeApp.spacing.lg * 2 - GAP_SIZE
const CARD_WIDTH = USABLE_WIDTH / 2.25

export const ProductScroll = ({ data }: { data: IProductListBanner }) => {
  const products = getProductsByIds(data.productIds)

  return (
    <View style={productScrollStyles.container}>
      {!!data.title && data.title !== '' && (
        <View style={productScrollStyles.listHeader}>
          <SectionHeader title={data.title} />
        </View>
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={productScrollStyles.cardContainer}>
            <ProductCard product={item} type="home" />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={productScrollStyles.listContent}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + GAP_SIZE}
        snapToAlignment="start"
      />
    </View>
  )
}

const productScrollStyles = StyleSheet.create({
  container: {},
  listHeader: {
    paddingLeft: themeApp.spacing.lg,
  },
  listContent: {
    paddingHorizontal: themeApp.spacing.lg,
    paddingBottom: themeApp.spacing.sm,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: GAP_SIZE,
  },
})

// ================================================================

const ADVERTISEMENT_PRODUCT_WIDTH = width * 0.3

export const ProductFeatured = ({ data }: { data: IProductFeaturedBanner }) => {
  const product = getProductById(data.productId)
  return (
    <View style={productFeaturedStyles.container}>
      <Image
        source={{ uri: product?.images?.[0] }}
        style={productFeaturedStyles.mediaImage}
      />
      <View style={productFeaturedStyles.productDetails}>
        <Text style={productFeaturedStyles.productName}>{product?.name}</Text>
        <Text style={productFeaturedStyles.legend}>{data.legend}</Text>
        <CtaButton title="Ver agora" type="filled" />
      </View>
    </View>
  )
}

const productFeaturedStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: themeApp.spacing.md,
    backgroundColor: '#E9E9E9',
    marginHorizontal: themeApp.spacing.lg,
    paddingVertical: themeApp.spacing.lg,
    paddingHorizontal: themeApp.spacing.md,
    borderLeftWidth: 5,
    borderLeftColor: colors.semantic.success,
    borderTopRightRadius: themeApp.borders.radius.xs,
    borderBottomRightRadius: themeApp.borders.radius.xs,
  },
  mediaImage: {
    width: ADVERTISEMENT_PRODUCT_WIDTH,
    height: ADVERTISEMENT_PRODUCT_WIDTH,
    borderRadius: themeApp.borders.radius.xs,
  },
  productDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  productName: {
    textAlign: 'right',
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
  },
  legend: {
    textAlign: 'right',
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.sm,
    color: colors.text.primary,
    marginBottom: themeApp.spacing.sm,
  },
})
