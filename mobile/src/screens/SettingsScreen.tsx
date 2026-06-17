import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTasteProfileStore } from '../store/useTasteProfileStore';
import { colors, spacing } from '../theme/colors';
import { AppStackParamList, MainTabParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Settings'>,
  NativeStackScreenProps<AppStackParamList>
>;

export function SettingsScreen({ navigation }: Props) {
  const tasteProfileText = useTasteProfileStore((state) => state.tasteProfileText);
  const savedCount = useTasteProfileStore((state) => state.savedProducts.length);
  const resetAnswers = useTasteProfileStore((state) => state.resetAnswers);

  function handleRefineTaste() {
    navigation.navigate('RefineTaste');
  }

  function handleRetakeQuiz() {
    Alert.alert(
      'Retake the quiz?',
      'This clears your taste profile, likes, and saved items, and starts onboarding over.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Retake', style: 'destructive', onPress: resetAnswers },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your taste profile</Text>
        <Text style={styles.cardBody}>{tasteProfileText ?? 'No profile yet.'}</Text>
      </View>
      <Text style={styles.statLine}>
        {savedCount} item{savedCount === 1 ? '' : 's'} saved
      </Text>
      <Pressable style={styles.actionButton} onPress={handleRefineTaste}>
        <Text style={styles.actionLabel}>Refine my taste</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={handleRetakeQuiz}>
        <Text style={styles.secondaryLabel}>Retake the quiz</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardBody: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 21,
  },
  statLine: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.surface,
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  secondaryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
