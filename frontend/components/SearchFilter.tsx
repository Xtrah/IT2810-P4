import { useQuery } from '@apollo/client';
import { Box, Center, Collapse, HStack, Select, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { borderColor, borderWidth } from 'styled-system';
import pokemonTypes from '../constants/pokemonTypes';
import { GET_POKEMON_FILTER } from '../utils/queries';
import setPokemonFilter from '../utils/setPokemonFilter';

interface Props {
  show: boolean;
}

/**
 * This component renders a collapsible filter
 */
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
    <Collapse isOpen={show} width="100%">
      <Box
        p={4}
        m={3}
        borderWidth={2}
        borderColor="red.500"
        backgroundColor="gray.50"
        rounded="md"
        shadow={4}
      >
        <HStack p={2} space={4}>
          <Center>
            <Text fontWeight="500" fontSize="md">
              Filter types:
            </Text>
          </Center>
          <Center flexGrow={2}>
            <Select
              width="100%"
              selectedValue={pokemonType}
              placeholder="Choose type"
              accessibilityLabel="Choose type"
              onValueChange={(filterType) => setPokemonType(filterType)}
            >
              <Select.Item label="Show all" value="" />
              {pokemonTypes.map((type: string) => (
                <Select.Item label={type} key={type} value={type}>
                  {type}
                </Select.Item>
              ))}
            </Select>
          </Center>
        </HStack>
        <HStack p={2} space={4}>
          <Center>
            <Text fontWeight="500" fontSize="md">
              Sort names:
            </Text>
          </Center>
          <Center flexGrow={2}>
            <Select
              width="100%"
              placeholder="Sort by"
              selectedValue={pokemonSort}
              onValueChange={(sortDescending) => setPokemonSort(sortDescending)}
            >
              <Select.Item label="Ascending" value="false" />
              <Select.Item label="Descending" value="true" />
            </Select>
          </Center>
        </HStack>
      </Box>
    </Collapse>
  );
};

export default SearchFilter;
