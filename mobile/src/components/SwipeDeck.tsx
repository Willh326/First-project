import { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { ActionButton } from './ActionButton';
import { ProductCard } from './ProductCard';
import { colors, spacing } from '../theme/colors';
import { Product } from '../types/product';

interface SwipeDeckProps {
  title: string;
  subtitle: string;
  deck: Product[];
  emptyText: string;
  onSwipeRight: (product: Product, index: number) => void;
  onSwipeLeft: (product: Product, index: number) => void;
  onSwipedAll: () => void;
}

export function SwipeDeck({
  title,
  subtitle,
  deck,
  emptyText,
  onSwipeRight,
  onSwipeLeft,
  onSwipedAll,
}: SwipeDeckProps) {
  const ref = useRef<SwiperCardRefType>(null);

  const renderCard = useCallback((product: Product) => <ProductCard product={product} />, []);

  function handleSwipeRight(cardIndex: number) {
    const product = deck[cardIndex];
    if (product) onSwipeRight(product, cardIndex);
  }

  function handleSwipeLeft(cardIndex: number) {
    const product = deck[cardIndex];
    if (product) onSwipeLeft(product, cardIndex);
  }

  function handlePress(action: 'like' | 'pass') {
    if (action === 'like') {
      ref.current?.swipeRight();
    } else {
      ref.current?.swipeLeft();
    }
  }

  if (deck.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.deckContainer}>
        <Swiper
          ref={ref}
          data={deck}
          renderCard={renderCard}
          cardStyle={styles.card}
          keyExtractor={(product: Product) => product.id}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          onSwipedAll={onSwipedAll}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton label="Pass" variant="pass" onPress={() => handlePress('pass')} />
        <ActionButton label="Like" variant="like" onPress={() => handlePress('like')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
