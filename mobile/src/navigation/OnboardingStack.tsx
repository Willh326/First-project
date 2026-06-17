import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './types';
import { QuizScreen } from '../screens/onboarding/QuizScreen';
import { ProfileLoadingScreen } from '../screens/onboarding/ProfileLoadingScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="ProfileLoading" component={ProfileLoadingScreen} />
    </Stack.Navigator>
  );
}
