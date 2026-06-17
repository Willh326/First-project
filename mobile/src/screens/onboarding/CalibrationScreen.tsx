import { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { ActionButton } from '../../components/ActionButton';
import { ProductCard } from '../../components/ProductCard';
import { useTasteProfileStore } from '../../store/useTasteProfileStore';
import { colors, spacing } from '../../theme/colors';
import { OnboardingStackParamList } from '../../navigation/types';
import { Product } from '../../types/product';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Calibration'>;

export function CalibrationScreen({ navigation }: Props) {
  const calibrationDeck = useTasteProfileStore((state) => state.calibrationDeck);
  const likeProduct = useTasteProfileStore((state) => state.likeProduct);
  const ref = useRef<SwiperCardRefType>(null);

  const renderCard = useCallback(
    (product: Product) => <ProductCard product={product} />,
    [],
  );

  function handleSwipeRight(cardIndex: number) {
    const product = calibrationDeck[cardIndex];
    if (product) likeProduct(product.id);
  }

  function handleSwipedAll() {
    navigation.navigate('Feed');
  }

  function handlePress(action: 'like' | 'pass') {
    if (action === 'like') {
      ref.current?.swipeRight();
    } else {
      ref.current?.swipeLeft();
    }
  }

  if (calibrationDeck.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No products to show yet.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Like what you see?</Text>
        <Text style={styles.subtitle}>Swipe right to like, left to pass</Text>
      </View>
      <View style={styles.deckContainer}>
        <Swiper
          ref={ref}
          data={calibrationDeck}
          renderCard={renderCard}
          cardStyle={styles.card}
          keyExtractor={(product: Product) => product.id}
          onSwipeRight={handleSwipeRight}
          onSwipedAll={handleSwipedAll}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton label="Pass" variant="pass" onPress={() => handlePress('pass')} />
        <ActionButton label="Like" variant="like" onPress={() => handlePress('like')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  deckContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.lg,
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.textSecondary,
  },
});
