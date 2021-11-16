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
      <Flex justify-content="center">
        <HStack space={2} m={3}>
          <Input
            accessibilityLabel="Search for pokemon"
            fontSize="16"
            flexGrow={3}
            autoFocus
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
        <SearchFilter show={show} />
        <SearchResults
          data={data}
          navigateToCard={navigateToCard}
          loading={loading}
          error={error}
        />
        {data?.pokemons && (
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
        )}
      </Flex>
    </ScreenWrapper>
  );
}
