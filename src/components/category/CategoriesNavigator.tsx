// src/components/CategoriesNavigator.tsx

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import {
  IProductCategory,
  MainTabParamList,
  themeApp,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

const { width } = Dimensions.get('window')

const WIDTH_BASE = width - themeApp.spacing.lg * 2
const NAVIGATOR_ITEM_WIDTH = WIDTH_BASE / 4 - 4

interface CategoriesNavigatorProps {
  categories: IProductCategory[]
}

export const CategoriesNavigator = ({ categories }: CategoriesNavigatorProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>()

  const handleSelectCategory = (categoryId: string) => {
    navigation.navigate('CategoryStack', {
      screen: 'CategoryDetails',
      params: {
        categoryId: categoryId,
      },
    })
  }

  const renderCategoryItem = ({ item }: { item: IProductCategory }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSelectCategory(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  listContentContainer: {
    columnGap: 6,
    paddingHorizontal: themeApp.spacing.lg,
  },
  itemContainer: {
    alignItems: 'center',
    rowGap: themeApp.spacing.xs,
    width: NAVIGATOR_ITEM_WIDTH,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  image: {
    width: NAVIGATOR_ITEM_WIDTH - themeApp.spacing.xs,
    height: NAVIGATOR_ITEM_WIDTH - themeApp.spacing.xs,
    borderRadius: 100,
  },
  label: {
    // width: 80,
    width: '100%',
    textAlign: 'center',
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.sm,

    // borderWidth: 1,
    // borderColor: 'blue',
  },
})
