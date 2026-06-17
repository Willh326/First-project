import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './types';
import { QuizScreen } from '../screens/onboarding/QuizScreen';
import { ProfileLoadingScreen } from '../screens/onboarding/ProfileLoadingScreen';
import { CalibrationScreen } from '../screens/onboarding/CalibrationScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="ProfileLoading" component={ProfileLoadingScreen} />
      <Stack.Screen name="Calibration" component={CalibrationScreen} />
    </Stack.Navigator>
  );
}
