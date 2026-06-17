import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import { MainTabs } from './MainTabs';
import { RefineTasteScreen } from '../screens/RefineTasteScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="RefineTaste"
        component={RefineTasteScreen}
        options={{
          title: 'Refine your taste',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
        }}
      />
    </Stack.Navigator>
  );
}
