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
import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import PokemonCard from '../components/PokemonCard';
import { useLazyQuery } from '@apollo/client';
import { GET_POKEMONS_LIMITED } from '../utils/queries';

// This component contains search input and results
export default function SearchScreen() {
  const [searchText, onChangeSearchText] = useState('');

  const [getQuery, { data, loading, error }] =
    useLazyQuery(GET_POKEMONS_LIMITED);

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

  return (
    <ScrollView>
      <Flex alignItems="center">
        <HStack space={2}>
          <Input
            fontSize="16"
            autoFocus
            value={searchText}
            pr="4rem"
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
        <FlatList
          alignSelf="stretch"
          m={2}
          data={data?.pokemons}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
      </Flex>
    </ScrollView>
  );
}
