import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NativeBaseProvider } from 'native-base';
import useCachedResources from './utils/hooks/useCachedResources';

import Navigation from './navigation';
import { cache } from './cache';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://it2810-15.idi.ntnu.no:4000/graphql',
    cache,
  });
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
