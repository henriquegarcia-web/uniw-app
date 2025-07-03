import React from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, themeApp as theme } from '@papaya-punch/uniw-shared-modules'
import { mockBanners } from '@/types/banners'

interface ScreenProps {
  children?: React.ReactNode
  type?: 'full' | 'tab'
  style?: ViewStyle
  enableInsets?: boolean
  enableKeyboardAvoiding?: boolean
  listing?: {
    ref?: any
    data: any[]
    renderItem: (item: any) => React.ReactElement | null
    keyExtractor: (item: any) => string
    header?: React.ReactElement
    footer?: React.ReactElement
    empty?: React.ReactElement
    numColumns?: number
    withoutSpacing?: boolean
    onMomentumScrollEnd?: (event: any) => void
    horizontal?: boolean
  }
}

export const Screen = ({
  children,
  type = 'full',
  style,
  enableInsets = false,
  enableKeyboardAvoiding = false,
  listing,
}: ScreenProps) => {
  const insets = useSafeAreaInsets()

  const isListing = !!listing

  const containerStyle = [
    styles.container,
    type === 'tab' && styles.tabContainer,
    enableInsets && {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    style,
  ]

  const renderContent = () => {
    if (isListing) {
      return (
        <FlatList
          ref={listing.ref}
          ListHeaderComponent={listing.header ?? null}
          ListFooterComponent={listing.footer ?? null}
          ListEmptyComponent={listing.empty ?? null}
          data={listing.data}
          renderItem={listing.renderItem}
          keyExtractor={listing.keyExtractor}
          numColumns={listing.numColumns ?? 1}
          contentContainerStyle={[
            styles.listingContentContainer,
            !listing.withoutSpacing && {
              // paddingTop: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
            },
            // listing.withoutSpacing && { paddingTop: theme.spacing.md },
          ]}
          {...(listing.numColumns &&
            listing.numColumns > 1 && { columnWrapperStyle: { gap: theme.spacing.xs } })}
          onMomentumScrollEnd={listing.onMomentumScrollEnd}
          horizontal={listing.horizontal}
        />
      )
    } else {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>{children}</View>
        </ScrollView>
      )
    }
  }

  return (
    <SafeAreaView edges={['bottom']} style={containerStyle}>
      {enableKeyboardAvoiding ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    rowGap: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  listingContentContainer: {
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  scrollContentContainer: {
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  tabContainer: {
    marginBottom: theme.spacing.custom['botom-tab-height'],
  },
})
