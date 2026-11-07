import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import MeasurementScreen from './src/screens/MeasurementScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreen onFinish={() => setReady(true)} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.bgDark },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Measurement"
          component={MeasurementScreen}
          options={{ title: 'Land Measurement' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
