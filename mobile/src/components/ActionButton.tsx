import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

interface ActionButtonProps {
  label: string;
  variant: 'like' | 'pass';
  onPress: () => void;
}

export function ActionButton({ label, variant, onPress }: ActionButtonProps) {
  return (
    <Pressable
      style={[styles.button, variant === 'like' ? styles.likeButton : styles.passButton]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={variant === 'like' ? styles.likeLabel : styles.passLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
  },
  likeButton: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  passButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  likeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  passLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
