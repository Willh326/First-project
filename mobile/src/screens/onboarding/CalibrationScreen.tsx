import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { SwipeDeck } from '../../components/SwipeDeck';
import { useTasteProfileStore } from '../../store/useTasteProfileStore';
import { colors } from '../../theme/colors';
import { Product } from '../../types/product';

export function CalibrationScreen() {
  const calibrationDeck = useTasteProfileStore((state) => state.calibrationDeck);
  const likeProduct = useTasteProfileStore((state) => state.likeProduct);
  const passProduct = useTasteProfileStore((state) => state.passProduct);
  const completeOnboarding = useTasteProfileStore((state) => state.completeOnboarding);

  function handleSwipeRight(product: Product) {
    likeProduct(product);
  }

  function handleSwipeLeft(product: Product) {
    passProduct(product.id);
  }

  function handleSwipedAll() {
    completeOnboarding();
  }

  return (
    <SafeAreaView style={styles.container}>
      <SwipeDeck
        title="Like what you see?"
        subtitle="Swipe right to like, left to pass"
        deck={calibrationDeck}
        emptyText="No products to show yet."
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
});
