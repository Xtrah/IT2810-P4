import React, { useEffect, useState } from 'react';
import { Flex, HStack, Icon, IconButton, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useLazyQuery, useQuery } from '@apollo/client';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchResults from '../components/SearchResults';
import { GET_POKEMONS_LIMITED, GET_POKEMON_FILTER } from '../utils/queries';
import SearchFilter from '../components/SearchFilter';
import { pokemonFilterVar } from '../cache';
import { RootStackScreenProps } from '../types/navigation';

// This value aligns with the hardcoded limit in backend
const ITEM_FETCH_LIMIT = 10;

// Contains search input and results
export default function SearchScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  // Start first fetchmore with offset, to add to the already fetched items
  const [offset, setOffset] = useState(0);
  const [searchText, onChangeSearchText] = useState('');

  // This handles the toggle of SearchFilter
  const [show, toggleShow] = useState(false);
  const handleToggle = () => toggleShow(!show);

  // This fetches the filter global state
  const {
    data: { pokemonFilter },
  } = useQuery(GET_POKEMON_FILTER);
  const [getQuery, { data, loading, error, fetchMore }] = useLazyQuery(
    GET_POKEMONS_LIMITED,
    {
      variables: {
        name: searchText,
        sortDescending: pokemonFilter.sortDescending,
        type: pokemonFilter.type,
        offset,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Query on first mount
  useEffect(() => {
    getQuery({
      variables: {
        name: searchText,
        sortDescending: pokemonFilterVar().sortDescending,
        type: pokemonFilterVar().type,
        offset,
      },
    });
    // Disabling to only query first on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset offset on filter change
  useEffect(() => {
    setOffset(0);
  }, [pokemonFilter.type, pokemonFilter.sortDescending]);

  // Query more items and update offset
  const onLoadMore = () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          name: searchText,
          sortDescending: pokemonFilterVar().sortDescending,
          type: pokemonFilterVar().type,
          offset: offset + ITEM_FETCH_LIMIT,
        },
      }).then(() => setOffset(offset + ITEM_FETCH_LIMIT));
    }
  };

  // Query data when submitting search
  function onSubmit() {
    getQuery({
      variables: {
        name: searchText,
        sortDescending: pokemonFilterVar().sortDescending,
        type: pokemonFilterVar().type,
        offset,
      },
    });
  }

  // Navigate to PokemonCardScreen
  function navigateToCard(pokemonId: string) {
    navigation.navigate('PokemonCardScreen', {
      pokemonId,
    });
  }

  return (
    <ScreenWrapper>
      <>
        <Flex m={3} alignItems="center">
          <HStack space={2}>
            <Input
              accessibilityLabel="Search for pokemon"
              fontSize="16"
              autoFocus
              flexGrow={1}
              value={searchText}
              type="text"
              placeholder="Enter pokemon name"
              onChangeText={onChangeSearchText}
            />
            <IconButton
              onPress={onSubmit}
              accessibilityLabel="Search for pokemon"
              icon={<Icon as={MaterialIcons} name="search" />}
              _icon={{
                color: 'red.500',
                size: 'md',
              }}
              _hover={{
                bg: 'red.500:alpha.20',
              }}
            />
            <IconButton
              onPress={handleToggle}
              accessibilityLabel="Open settings"
              icon={<Icon as={MaterialIcons} name="settings" />}
              _icon={{
                color: 'red.500',
                size: 'md',
              }}
              _hover={{
                bg: 'red.500:alpha.20',
              }}
            />
          </HStack>

          <SearchFilter show={show} />
        </Flex>

        <SearchResults
          data={data}
          navigateToCard={navigateToCard}
          loading={loading}
          error={error}
          loadMore={onLoadMore}
        />
      </>
    </ScreenWrapper>
  );
}
