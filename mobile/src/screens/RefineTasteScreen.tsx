import { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SwipeDeck } from '../components/SwipeDeck';
import { useTasteProfileStore } from '../store/useTasteProfileStore';
import { colors, spacing } from '../theme/colors';
import { AppStackParamList } from '../navigation/types';
import { Product } from '../types/product';

type Props = NativeStackScreenProps<AppStackParamList, 'RefineTaste'>;

export function RefineTasteScreen({ navigation }: Props) {
  const swipeSessionDeck = useTasteProfileStore((state) => state.swipeSessionDeck);
  const swipeSessionStatus = useTasteProfileStore((state) => state.swipeSessionStatus);
  const swipeSessionError = useTasteProfileStore((state) => state.swipeSessionError);
  const startSwipeSession = useTasteProfileStore((state) => state.startSwipeSession);
  const clearSwipeSession = useTasteProfileStore((state) => state.clearSwipeSession);
  const likeProduct = useTasteProfileStore((state) => state.likeProduct);
  const passProduct = useTasteProfileStore((state) => state.passProduct);

  useEffect(() => {
    startSwipeSession();
    return () => clearSwipeSession();
  }, [startSwipeSession, clearSwipeSession]);

  function handleSwipeRight(product: Product) {
    likeProduct(product);
  }

  function handleSwipeLeft(product: Product) {
    passProduct(product.id);
  }

  function handleSwipedAll() {
    navigation.goBack();
  }

  if (swipeSessionStatus === 'loading' && swipeSessionDeck.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.statusText}>Finding more for you to rate…</Text>
      </SafeAreaView>
    );
  }

  if (swipeSessionStatus === 'error' && swipeSessionDeck.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.statusText}>{swipeSessionError}</Text>
        <Pressable style={styles.retryButton} onPress={startSwipeSession}>
          <Text style={styles.retryLabel}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SwipeDeck
        title="Refine your taste"
        subtitle="Swipe right to like, left to pass"
        deck={swipeSessionDeck}
        emptyText="No more products to rate right now."
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        onSwipedAll={handleSwipedAll}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  retryButton: {
    marginTop: spacing.md,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: colors.accent,
  },
  retryLabel: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 14,
  },
});
