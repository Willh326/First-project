import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { FeedItem } from '../types/feed';
import { openRetailerUrl } from '../utils/links';

interface FeedCardProps {
  item: FeedItem;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function FeedCard({ item, isSaved, onToggleSave }: FeedCardProps) {
  const { product, reason } = item;

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.retailer}>{product.retailer}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.reason}>{reason}</Text>
        <View style={styles.buttonsRow}>
          <Pressable
            style={styles.saveButton}
            onPress={onToggleSave}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? 'Remove from saved' : 'Save'}
          >
            <Text style={styles.saveLabel}>{isSaved ? 'Saved' : 'Save'}</Text>
          </Pressable>
          <Pressable
            style={styles.buyButton}
            onPress={() => openRetailerUrl(product.retailerUrl)}
            accessibilityRole="button"
            accessibilityLabel={`Buy ${product.title} at ${product.retailer}`}
          >
            <Text style={styles.buyLabel}>Buy</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: colors.accentMuted,
  },
  details: {
    padding: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  retailer: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  reason: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  saveLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  buyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  buyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.surface,
  },
});
