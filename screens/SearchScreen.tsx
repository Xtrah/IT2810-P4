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
          <FlatList
            alignSelf="stretch"
            m={2}
            data={data?.pokemons}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Pressable
                accessibilityLabel="Navigate to specific Pokemon Card Screen"
                onPress={() =>
                  navigation.navigate('PokemonCardScreen', {
                    pokemonId: item._id,
                  })
                }
              >
                <PokemonCard pokemon={item} />
              </Pressable>
            )}
          />
        </Flex>
      </ScrollView>
    </ScreenWrapper>
  );
}
