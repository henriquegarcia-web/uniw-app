// src/screens/OnboardingScreen.tsx

import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native'

import {
  OnboardingScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const slides = [
  {
    id: '1',
    image: require('@/assets/images/onboarding/onboarding-1.png'),
    title: 'Conectando Pessoas',
    subtitle:
      'Não perca mais tempo com sistemas de fidelidade ultrapassados e tenha acesso a um sistema aprovado por 99% dos usuários.',
  },
  {
    id: '2',
    image: require('@/assets/images/onboarding/onboarding-2.png'),
    title: 'Escolha Seu Produto',
    subtitle:
      'A UNIW liga várias empresas para a comodidade de seu cliente, com variedade de produtos com ótima qualidade.',
  },
  {
    id: '3',
    image: require('@/assets/images/onboarding/onboarding-3.png'),
    title: 'Pedido Rápido e Seguro',
    subtitle:
      'Com isso a UNIW lhe traz o conforto e interatividade e rapidez para suas compras e assim agilizando a entrega de seus produtos.',
  },
]

// Componente para renderizar um único item do slide
const Slide = ({ item }: { item: (typeof slides)[0] }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  )
}

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { completeOnboarding } = useClientAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef<FlatList>(null)

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / width)
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentIndex + 1
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width
      ref?.current?.scrollToOffset({ offset })
      setCurrentIndex(nextSlideIndex)
    }
  }

  const goToPreviousSlide = () => {
    const previousSlideIndex = currentIndex - 1
    if (previousSlideIndex >= 0) {
      const offset = previousSlideIndex * width
      ref?.current?.scrollToOffset({ offset })
      setCurrentIndex(previousSlideIndex)
    }
  }

  const skip = () => {
    completeOnboarding()
  }

  // Componente do rodapé com os botões e indicadores
  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        {/* Botões de navegação */}
        <View style={styles.buttonsContainer}>
          {currentIndex > 0 ? (
            <TouchableOpacity style={styles.navButton} onPress={goToPreviousSlide}>
              <Text style={[styles.navButtonText, styles.returnText]}>Anterior</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }} /> // Espaçador para manter o alinhamento
          )}

          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>

          {currentIndex === slides.length - 1 ? (
            <TouchableOpacity style={styles.navButton} onPress={completeOnboarding}>
              <Text style={[styles.navButtonText, styles.startText]}>Iniciar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navButton} onPress={goToNextSlide}>
              <Text style={[styles.navButtonText, styles.nextText]}>Próximo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  return (
    // <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={colors.ui.background} /> */}

      {/* Cabeçalho com indicador de página e botão de pular */}
      <View style={styles.header}>
        <Text style={styles.pageIndicator}>
          <Text style={styles.pageIndicatorCurrent}>{currentIndex + 1}</Text>/
          {slides.length}
        </Text>
        <TouchableOpacity onPress={skip}>
          <Text style={styles.skipButtonText}>Pular</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{
          // height: height * 0.7,
          // borderWidth: 1,
          // borderColor: 'red',
          justifyContent: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  pageIndicator: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.lg,
    color: colors.text.tertiary,
  },
  pageIndicatorCurrent: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: colors.text.primary,
  },
  skipButtonText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    color: colors.text.primary,
  },
  slideContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  image: {
    width: '100%',
    maxWidth: 240,
    marginTop: 20,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxl,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footerContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    // height: height * 0.15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: colors.ui.disabled,
    marginHorizontal: 3,
    borderRadius: 4,
  },
  indicatorActive: {
    backgroundColor: colors.brand.primary,
    width: 38,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flex: 1,
  },
  navButtonText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
  },
  returnText: {
    textAlign: 'left',
    color: colors.text.tertiary,
  },
  nextText: {
    textAlign: 'right',
    color: colors.brand.primary,
  },
  startText: {
    textAlign: 'right',
    color: colors.semantic.success,
  },
})

export default OnboardingScreen
