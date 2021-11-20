import { useQuery } from '@apollo/client';
import { Collapse, Flex, HStack, Select, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import pokemonTypes from '../constants/pokemonTypes';
import { GET_POKEMON_FILTER } from '../utils/queries';
import setPokemonFilter from '../utils/setPokemonFilter';

interface Props {
  show: boolean;
}

// This component renders a collapsible filter
const SearchFilter = ({ show }: Props) => {
  // Get filter to initialize select value
  const {
    data: { pokemonFilter },
  } = useQuery(GET_POKEMON_FILTER);

  // Initiating value with global state
  const [pokemonSort, setPokemonSort] = useState(
    String(pokemonFilter.sortDescending)
  ); // Convert boolean to string
  const [pokemonType, setPokemonType] = useState(pokemonFilter.type);

  // Update pokemonfilter on filter change
  useEffect(() => {
    const sortDescending = pokemonSort === 'true'; // Converts string to boolean
    const type = pokemonType;
    // Update filter global state
    setPokemonFilter({
      type,
      sortDescending,
    });
  }, [pokemonSort, pokemonType]);

  return (
    <Collapse w="100%" isOpen={show}>
      <Flex
        w="100%"
        p={2}
        m={2}
        borderWidth={2}
        borderColor="red.500"
        backgroundColor="gray.50"
        rounded="md"
        shadow={4}
      >
        <HStack p={2} w="100%" justifyContent="center" alignItems="center">
          <Text w="85px" fontWeight="500" fontSize="md" mr={2}>
            Filter types
          </Text>
          <Select
            flexGrow={1}
            selectedValue={pokemonType}
            placeholder="Choose type"
            onValueChange={(filterType) => setPokemonType(filterType)}
          >
            <Select.Item label="Show all" value="" />
            {pokemonTypes.map((type: string) => (
              <Select.Item label={type} key={type} value={type}>
                {type}
              </Select.Item>
            ))}
          </Select>
        </HStack>
        <HStack p={2} w="100%" justifyContent="center" alignItems="center">
          <Text w="85px" fontWeight="500" fontSize="md" mr={2}>
            Sort names
          </Text>
          <Select
            flexGrow={1}
            placeholder="Sort by"
            selectedValue={pokemonSort}
            onValueChange={(sortDescending) => setPokemonSort(sortDescending)}
          >
            <Select.Item label="Ascending" value="false" />
            <Select.Item label="Descending" value="true" />
          </Select>
        </HStack>
      </Flex>
    </Collapse>
  );
};

export default SearchFilter;
