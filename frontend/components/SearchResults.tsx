import React from 'react';
import { Alert, Button, FlatList, Icon, Pressable, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ApolloError } from '@apollo/client';
import { PokemonLimited } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface Props {
  data: { pokemons: PokemonLimited[] };
  loading: boolean;
  error: ApolloError | undefined;
  // eslint-disable-next-line no-unused-vars
  navigateToCard: (pokemonId: string) => void;
  loadMore: () => void;
}

// This presents the search results
export default function SearchResults({
  error,
  loading,
  data,
  navigateToCard,
  loadMore,
}: Props) {
  if (error) {
    return (
      <Alert status="error">
        <Icon as={MaterialIcons} name="dangerous" />
        There was an error processing your request
      </Alert>
    );
  }

  if (!data && loading) {
    return <Spinner color="red.500" accessibilityLabel="Loading data" />;
  }

  return (
    <FlatList
      alignSelf="stretch"
      m={2}
      pb={2}
      data={data?.pokemons}
      keyExtractor={(item) => item._id}
      ListFooterComponent={
        data?.pokemons && (
          <Button
            disabled={loading}
            isLoading={loading}
            bgColor="red.500"
            color="white"
            m="20px"
            size="md"
            onPress={loadMore}
            _pressed={{ bg: 'red.700' }}
          >
            Load more
          </Button>
        )
      }
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
