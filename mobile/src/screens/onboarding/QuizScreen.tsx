import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgressBar } from '../../components/ProgressBar';
import { QuizQuestionCard } from '../../components/QuizQuestionCard';
import { quizQuestions } from '../../data/quizQuestions';
import { useTasteProfileStore } from '../../store/useTasteProfileStore';
import { colors, spacing } from '../../theme/colors';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Quiz'>;

export function QuizScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const answers = useTasteProfileStore((state) => state.answers);
  const setAnswer = useTasteProfileStore((state) => state.setAnswer);

  const question = quizQuestions[currentIndex];
  const selectedOptionIds = answers[question.id] ?? [];
  const isLastQuestion = currentIndex === quizQuestions.length - 1;

  function handleToggleOption(optionId: string) {
    if (question.type === 'single') {
      setAnswer(question.id, [optionId]);
      return;
    }
    const alreadySelected = selectedOptionIds.includes(optionId);
    const next = alreadySelected
      ? selectedOptionIds.filter((id) => id !== optionId)
      : [...selectedOptionIds, optionId];
    setAnswer(question.id, next);
  }

  function handleNext() {
    if (isLastQuestion) {
      navigation.navigate('ProfileLoading');
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function handleBack() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <ProgressBar current={currentIndex + 1} total={quizQuestions.length} />
        <QuizQuestionCard
          question={question}
          selectedOptionIds={selectedOptionIds}
          onToggleOption={handleToggleOption}
        />
      </ScrollView>
      <View style={styles.footer}>
        {currentIndex > 0 && (
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonLabel}>Back</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.nextButton, selectedOptionIds.length === 0 && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={selectedOptionIds.length === 0}
        >
          <Text style={styles.nextButtonLabel}>
            {isLastQuestion ? 'See my profile' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  backButtonLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  nextButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  nextButtonDisabled: {
    backgroundColor: colors.border,
  },
  nextButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
});
