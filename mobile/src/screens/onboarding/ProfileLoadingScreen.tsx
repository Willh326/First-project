import { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTasteProfileStore } from '../../store/useTasteProfileStore';
import { colors, spacing } from '../../theme/colors';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ProfileLoading'>;

export function ProfileLoadingScreen({ navigation }: Props) {
  const profileStatus = useTasteProfileStore((state) => state.profileStatus);
  const profileError = useTasteProfileStore((state) => state.profileError);
  const generateProfile = useTasteProfileStore((state) => state.generateProfile);

  useEffect(() => {
    generateProfile();
  }, [generateProfile]);

  useEffect(() => {
    if (profileStatus === 'success') {
      navigation.navigate('Calibration');
    }
  }, [profileStatus, navigation]);

  return (
    <View style={styles.container}>
      {profileStatus === 'error' ? (
        <>
          <Text style={styles.title}>Couldn't build your profile</Text>
          <Text style={styles.subtitle}>{profileError}</Text>
          <Pressable style={styles.retryButton} onPress={generateProfile}>
            <Text style={styles.retryLabel}>Try again</Text>
          </Pressable>
        </>
      ) : (
        <>
          <ActivityIndicator color={colors.accent} size="large" style={styles.spinner} />
          <Text style={styles.title}>Building your taste profile…</Text>
          <Text style={styles.subtitle}>This takes just a few seconds.</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  spinner: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  retryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
});
