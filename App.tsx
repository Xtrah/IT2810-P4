import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './utils/hooks/useCachedResources';
import useColorScheme from './utils/hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider, Box } from 'native-base';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
