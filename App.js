import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SolicitudesProvider } from './src/store/SolicitudesContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ListScreen from './src/screens/ListScreen';
import CreateScreen from './src/screens/CreateScreen';
import DetailScreen from './src/screens/DetailScreen';
import { COLORS } from './src/utils/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SolicitudesProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="List" component={ListScreen} options={{ title: 'Solicitudes', headerBackVisible: false }} />
          <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Nueva solicitud' }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalle' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SolicitudesProvider>
  );
}
