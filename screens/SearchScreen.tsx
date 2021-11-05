import {
  Flex,
  HStack,
  Input,
  IconButton,
  Icon,
  FlatList,
  Alert,
  Spinner,
  ScrollView,
} from 'native-base';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import PokemonCard from '../components/PokemonCard';
import { useLazyQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED } from '../utils/queries';
import { Pressable } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchResults from '../components/SearchResults';

// This value aligns with the hardcoded limit in backend
const ITEM_FETCH_LIMIT = 10;

// This component contains search input and results
export default function SearchScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  const [searchText, onChangeSearchText] = useState('');

  const [getQuery, { data, loading, error }] =
    useLazyQuery(GET_POKEMONS_LIMITED);

  // Query data from initial render
  useEffect(() => {
    getQuery();
  }, []);

  // Query data when submitting
  function onSubmit() {
    getQuery({
      variables: {
        name: searchText,
      },
    });
  }

  function onToggle() {
    // TODO: Handle toggling filter
  }

  // Sent to card for navigation
  function navigateToCard(pokemonId: string) {
    navigation.navigate('PokemonCardScreen', {
      pokemonId: pokemonId,
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
              onPress={onToggle}
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
          <SearchResults
            data={data}
            navigateToCard={navigateToCard}
            loading={loading}
            error={error}
          />
        </Flex>
      </ScrollView>
    </ScreenWrapper>
  );
}
