import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasteProfileStore } from '../store/useTasteProfileStore';
import { colors, spacing } from '../theme/colors';
import { Product } from '../types/product';
import { openRetailerUrl } from '../utils/links';

export function SavedScreen() {
  const savedProducts = useTasteProfileStore((state) => state.savedProducts);
  const unsaveProduct = useTasteProfileStore((state) => state.unsaveProduct);

  function renderItem({ item }: { item: Product }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.retailer}>{item.retailer}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.buttonsRow}>
            <Pressable
              style={styles.removeButton}
              onPress={() => unsaveProduct(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.title} from saved`}
            >
              <Text style={styles.removeLabel}>Remove</Text>
            </Pressable>
            <Pressable
              style={styles.buyButton}
              onPress={() => openRetailerUrl(item.retailerUrl)}
              accessibilityRole="button"
              accessibilityLabel={`Buy ${item.title} at ${item.retailer}`}
            >
              <Text style={styles.buyLabel}>Buy</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (savedProducts.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.emptyTitle}>Nothing saved yet</Text>
        <Text style={styles.emptySubtitle}>Items you save from your feed will show up here.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>Saved</Text>}
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
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: colors.accentMuted,
  },
  details: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  retailer: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  removeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  buyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.accent,
  },
  buyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.surface,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
