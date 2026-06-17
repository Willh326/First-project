import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedCard } from '../components/FeedCard';
import { useTasteProfileStore } from '../store/useTasteProfileStore';
import { colors, spacing } from '../theme/colors';
import { FeedItem } from '../types/feed';
import { AppStackParamList, MainTabParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Feed'>,
  NativeStackScreenProps<AppStackParamList>
>;

export function FeedScreen({ navigation }: Props) {
  const feedItems = useTasteProfileStore((state) => state.feedItems);
  const feedStatus = useTasteProfileStore((state) => state.feedStatus);
  const feedError = useTasteProfileStore((state) => state.feedError);
  const loadFeed = useTasteProfileStore((state) => state.loadFeed);
  const loadMoreFeed = useTasteProfileStore((state) => state.loadMoreFeed);
  const isLoadingMoreFeed = useTasteProfileStore((state) => state.isLoadingMoreFeed);
  const savedProducts = useTasteProfileStore((state) => state.savedProducts);
  const saveProduct = useTasteProfileStore((state) => state.saveProduct);
  const unsaveProduct = useTasteProfileStore((state) => state.unsaveProduct);

  useEffect(() => {
    if (feedItems.length === 0 && feedStatus === 'idle') {
      loadFeed();
    }
  }, [feedItems.length, feedStatus, loadFeed]);

  const savedIds = new Set(savedProducts.map((product) => product.id));

  function renderItem({ item }: { item: FeedItem }) {
    const isSaved = savedIds.has(item.product.id);
    return (
      <FeedCard
        item={item}
        isSaved={isSaved}
        onToggleSave={() => (isSaved ? unsaveProduct(item.product.id) : saveProduct(item.product))}
      />
    );
  }

  if (feedStatus === 'loading' && feedItems.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.statusText}>Curating your feed…</Text>
      </SafeAreaView>
    );
  }

  if (feedStatus === 'error' && feedItems.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.statusText}>{feedError}</Text>
        <Pressable style={styles.retryButton} onPress={loadFeed}>
          <Text style={styles.retryLabel}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.product.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.header}>For you</Text>
            <Pressable
              style={styles.refineButton}
              onPress={() => navigation.navigate('RefineTaste')}
            >
              <Text style={styles.refineLabel}>Refine taste</Text>
            </Pressable>
          </View>
        }
        onRefresh={loadFeed}
        refreshing={feedStatus === 'loading'}
        onEndReached={loadMoreFeed}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMoreFeed ? (
            <ActivityIndicator color={colors.accent} style={styles.footerLoader} />
          ) : null
        }
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
  footerLoader: {
    marginVertical: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  refineButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  refineLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
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
