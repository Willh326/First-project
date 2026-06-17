import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../theme/colors';

export function ProfileLoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Building your taste profile…</Text>
      <Text style={styles.subtitle}>This screen will call the backend next.</Text>
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
});
