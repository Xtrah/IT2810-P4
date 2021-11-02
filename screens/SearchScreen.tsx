import {
  Flex,
  HStack,
  Input,
  IconButton,
  Icon,
  FlatList,
  Box,
} from 'native-base';
import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { PokemonLimited } from '../types/pokemon';
import PokemonCard from '../components/PokemonCard';

export default function SearchScreen() {
  const data: PokemonLimited[] = [
    {
      _id: '1',
      name: 'Poke1',
      description: 'First',
      types: ['normal'],
      imageUrl:
        'https://gfx.nrk.no/oJlbST8KhHb6n9C2787iJArLzzZozJ-66kBHzqrUIZnw.jpg',
    },
    {
      _id: '2',
      name: 'Poke2',
      description: 'First',
      types: ['water', 'fairy'],
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    },
  ];
  const [searchText, onChangeSearchText] = useState('');

  function onToggle() {
    console.log('Toggle settings');
  }
  return (
    <Flex alignItems="center">
      <HStack space={2}>
        <Input
          value={searchText}
          pr="4rem"
          type="text"
          placeholder="Enter pokemon name"
          onChangeText={onChangeSearchText}
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
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </Flex>
  );
}
