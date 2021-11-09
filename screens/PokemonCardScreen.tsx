import React from 'react';
import {
  Alert,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  View,
  Image,
} from 'native-base';
import { RootStackScreenProps } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';
import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../utils/queries';
import getGradientByType from '../utils/getGradientByType';
import getIconByType from '../utils/getIconByType';
import { MaterialIcons } from '@expo/vector-icons';
import Gradient from '../components/Gradient';

// This renders the detail screen of pokemons
function PokemonCardScreen({
  route,
}: RootStackScreenProps<'PokemonCardScreen'>) {
  const { pokemonId } = route.params;

  const { error, loading, data } = useQuery(GET_POKEMON, {
    variables: { _id: pokemonId },
  });

  if (error) {
    return (
      <Alert status="error">
        <Icon as={MaterialIcons} name="dangerous" />
        There was an error processing your request
      </Alert>
    );
  }

  if (loading) {
    return <Spinner color="red.500" />;
  }

  if (!data) {
    return <></>;
  }

  const { pokemon } = data;

  return (
    <ScreenWrapper>
      <Stack direction="column">
        <Gradient colors={getGradientByType(pokemon.types[0])}>
          <Image
            borderRadius="xl"
            width="100%"
            height="250"
            resizeMode="contain"
            source={{ uri: pokemon.imageUrl }}
            // Fallback to Bulbasaur if image doesn't load
            fallbackSource={{
              uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            }}
            alt={pokemon.name}
          />
        </Gradient>
        <Box mb={5} mt={2} p={2}>
          <Heading textAlign="left" color="#333">
            {pokemon.name}
            {pokemon.types.map((type: string) => (
              <Gradient key={type} colors={getGradientByType(type)}>
                <Image
                  m={2}
                  display="inline"
                  borderRadius="xl"
                  boxSize="20px"
                  resizeMode="contain"
                  source={{ uri: getIconByType(type) }}
                  alt={pokemon.name}
                />
              </Gradient>
            ))}
          </Heading>
          <Text textAlign="left">{pokemon.description}</Text>
        </Box>
        <Gradient colors={getGradientByType(pokemon.types[0])}>
          <Flex
            flexDirection="row"
            justifyContent="space-around"
            borderRadius="md"
            p={2}
          >
            <Stack bgColor="rgba(255, 255, 255, 0.3)" borderRadius="md" p={2}>
              <Text textAlign="center" fontWeight="bold">
                Height
              </Text>
              <Text textAlign="center">{pokemon.height} inches</Text>
            </Stack>
            <Stack bgColor="rgba(255, 255, 255, 0.3)" borderRadius="md" p={2}>
              <Text textAlign="center" fontWeight="bold">
                Weight
              </Text>
              <Text textAlign="center">{pokemon.weight} lbs</Text>
            </Stack>
          </Flex>
        </Gradient>
      </Stack>
    </ScreenWrapper>
  );
}

export default PokemonCardScreen;
