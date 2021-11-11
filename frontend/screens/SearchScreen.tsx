import {
  Flex,
  HStack,
  Input,
  IconButton,
  Icon,
  ScrollView,
  Button,
  Center,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED, GET_POKEMON_FILTER } from '../utils/queries';
import { RootStackScreenProps } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchResults from '../components/SearchResults';
import SearchFilter from '../components/SearchFilter';
import { pokemonFilterVar } from '../cache';

// This value aligns with the hardcoded limit in backend
const ITEM_FETCH_LIMIT = 10;

// This component contains search input and results
export default function SearchScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  // Start first fetchmore with offset, to add to the already fetched items
  const [offset, setOffset] = useState(0);
  const [searchText, onChangeSearchText] = useState('');

  const [getQuery, { data, loading, error, fetchMore }] = useLazyQuery(
    GET_POKEMONS_LIMITED,
    {
      variables: {
        name: searchText,
        sortDescending: pokemonFilterVar().sortDescending,
        type: pokemonFilterVar().type,
        offset,
      },
    }
  );

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

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

  // Reset offset when search text changes
  useEffect(() => {
    setOffset(ITEM_FETCH_LIMIT);
  }, [searchText]);

  // Query data when submitting
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

  // Sent to card for navigation
  function navigateToCard(pokemonId: string) {
    navigation.navigate('PokemonCardScreen', {
      pokemonId,
    });
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Flex alignItems="center">
          <HStack space={2}>
            <Input
              accessibilityLabel="Search for pokemon"
              fontSize="16"
              autoFocus
              width="100%"
              value={searchText}
              type="text"
              placeholder="Enter pokemon name"
              onChangeText={onChangeSearchText}
            />
            <IconButton
              onPress={onSubmit}
              aria-label="Search for pokemon"
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
              aria-label="Open settings"
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

          <SearchFilter show={show} onSubmit={onSubmit} />

          <SearchResults
            data={data}
            navigateToCard={navigateToCard}
            loading={loading}
            error={error}
          />

          <Center height="100px">
            <Button
              disabled={loading}
              bgColor="red.500"
              color="white"
              h="1.75rem"
              size="md"
              onPress={onLoadMore}
            >
              Load more
            </Button>
          </Center>
        </Flex>
      </ScrollView>
    </ScreenWrapper>
  );
}
