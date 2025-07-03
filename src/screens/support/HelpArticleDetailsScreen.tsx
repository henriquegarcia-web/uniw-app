// src/screens/support/HelpArticleDetailsScreen.tsx

import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import {
  HelpArticleDetailsScreenProps,
  themeApp as theme,
  colors,
} from '@papaya-punch/uniw-shared-modules'
import { getHelpArticleById } from '@/utils/mockGetters'
import { Screen } from '@/components/Screen'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const HelpArticleDetailsScreen = ({ route }: HelpArticleDetailsScreenProps) => {
  const { articleId } = route.params
  const article = useMemo(() => getHelpArticleById(articleId), [articleId])
  const [feedbackSent, setFeedbackSent] = useState(false)

  if (!article) {
    return (
      <Screen style={styles.container}>
        <ListEmptyMessage message="Artigo não encontrado." />
      </Screen>
    )
  }

  const handleFeedback = () => {
    setFeedbackSent(true)
    // Aqui você enviaria o feedback para sua análise
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content}</Text>

      <View style={styles.feedbackContainer}>
        {feedbackSent ? (
          <Text style={styles.feedbackThanks}>Obrigado pelo seu feedback!</Text>
        ) : (
          <>
            <Text style={styles.feedbackQuestion}>Este artigo foi útil?</Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity style={styles.button} onPress={handleFeedback}>
                <Feather name="thumbs-up" size={20} color={colors.semantic.success} />
                <Text style={[styles.buttonText, { color: colors.semantic.success }]}>
                  Sim
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleFeedback}>
                <Feather name="thumbs-down" size={20} color={colors.semantic.error} />
                <Text style={[styles.buttonText, { color: colors.semantic.error }]}>
                  Não
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
  },
  content: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  feedbackContainer: {
    marginTop: theme.spacing.xs,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.ui.border,
    alignItems: 'center',
  },
  feedbackQuestion: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    marginBottom: theme.spacing.md,
  },
  feedbackButtons: { flexDirection: 'row', gap: theme.spacing.lg },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
    borderRadius: theme.borders.radius.sm,
  },
  buttonText: { fontFamily: theme.fonts.family.medium },
  feedbackThanks: {
    fontFamily: theme.fonts.family.semiBold,
    color: colors.semantic.success,
  },
})

export default HelpArticleDetailsScreen
