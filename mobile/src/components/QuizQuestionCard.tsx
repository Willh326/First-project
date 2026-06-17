import { Pressable, StyleSheet, Text, View } from 'react-native';
import { QuizQuestion } from '../types/quiz';
import { colors, spacing } from '../theme/colors';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  selectedOptionIds: string[];
  onToggleOption: (optionId: string) => void;
}

export function QuizQuestionCard({
  question,
  selectedOptionIds,
  onToggleOption,
}: QuizQuestionCardProps) {
  return (
    <View>
      <Text style={styles.question}>{question.question}</Text>
      {question.type === 'multi' && (
        <Text style={styles.hint}>Select all that apply</Text>
      )}
      <View style={styles.options}>
        {question.options.map((option) => {
          const selected = selectedOptionIds.includes(option.id);
          return (
            <Pressable
              key={option.id}
              onPress={() => onToggleOption(option.id)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  hint: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: -spacing.md,
    marginBottom: spacing.md,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  optionPressed: {
    opacity: 0.7,
  },
  optionLabel: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    color: colors.accent,
    fontWeight: '600',
  },
});
