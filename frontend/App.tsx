import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './utils/hooks/useCachedResources';

import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';
import { cache } from './cache';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://it2810-15.idi.ntnu.no:4000/graphql',
    cache,
  });
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
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
}
