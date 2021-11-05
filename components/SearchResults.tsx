import React from 'react';

import { ApolloError } from '@apollo/client';
import { PokemonLimited } from '../types/pokemon';
import PokemonCard from './PokemonCard';
import { Alert, FlatList, Icon, Pressable, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  data: { pokemons: PokemonLimited[] };
  loading: boolean;
  error: ApolloError | undefined;
  navigateToCard: (pokemonId: string) => void;
}

// This presents the search results
export default function SearchResults({
  error,
  loading,
  data,
  navigateToCard,
}: Props) {
  if (error) {
    return (
      <Alert status="error">
        <Icon as={MaterialIcons} name="dangerous" />
        There was an error processing your request
      </Alert>
    );
  }

  if (loading) {
    return <Spinner color="red.500" accessibilityLabel="Loading data" />;
  }
  return (
    <FlatList
      alignSelf="stretch"
      m={2}
      data={data?.pokemons}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable
          accessibilityLabel="Navigate to specific Pokemon Card Screen"
          onPress={() => navigateToCard(item._id)}
        >
          <PokemonCard pokemon={item} />
        </Pressable>
      )}
    />
  );
}
