import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { OnboardingStack } from './OnboardingStack';
import { AppStack } from './AppStack';
import { useTasteProfileStore } from '../store/useTasteProfileStore';
import { colors } from '../theme/colors';

export function RootNavigator() {
  const hasHydrated = useTasteProfileStore((state) => state.hasHydrated);
  const onboardingComplete = useTasteProfileStore((state) => state.onboardingComplete);

  if (!hasHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {onboardingComplete ? <AppStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
