import { NavigationContainer } from '@react-navigation/native';
import { OnboardingStack } from './OnboardingStack';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <OnboardingStack />
    </NavigationContainer>
  );
}
