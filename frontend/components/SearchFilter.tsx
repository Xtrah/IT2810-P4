import { useQuery } from '@apollo/client';
import { Box, Center, Collapse, HStack, Select, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import pokemonTypes from '../constants/pokemonTypes';
import { GET_POKEMON_FILTER } from '../utils/queries';
import setPokemonFilter from '../utils/setPokemonFilter';

interface Props {
  show: boolean;
}

const SearchFilter = ({ show }: Props) => {
  // Get filter to initialize select value
  const { data: filterData } = useQuery(GET_POKEMON_FILTER);

  // Set filter values
  const [pokemonSort, setPokemonSort] = useState(
    filterData.pokemonFilter.sortDescending
  );
  const [pokemonType, setPokemonType] = useState(filterData.pokemonFilter.type);

  // Update pokemonfilter on filter change
  useEffect(() => {
    const sortDescending = pokemonSort === 'true'; // Converts string to boolean
    const type = pokemonType;
    // Applies the filter to the search query
    setPokemonFilter({
      type,
      sortDescending,
    });
  }, [pokemonSort, pokemonType]);

  return (
    <Collapse isOpen={show}>
      <Box
        p="10px"
        alignSelf="stretch"
        m={2}
        borderWidth={2}
        borderColor="red.500"
        rounded="md"
        shadow="md"
      >
        <HStack>
          <Box p={4}>
            <Text fontWeight="500" fontSize="md">
              Filter types:
            </Text>
          </Box>

          <Center>
            <Select
              defaultValue=""
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
          </Center>
        </HStack>
        <HStack>
          <Box p={4}>
            <Text fontWeight="500" fontSize="md">
              Sort names:
            </Text>
          </Box>

          <Center>
            <Select
              placeholder="Sort by"
              defaultValue="false"
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
