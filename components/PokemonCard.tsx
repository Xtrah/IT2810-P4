import React from 'react';
import { Flex, Text, Image } from 'native-base';
import { PokemonLimited } from '../types/pokemon';
import getGradientByType from '../utils/getGradientByType';
import getIconByType from '../utils/getIconByType';
import Gradient from './Gradient';

interface Props {
  pokemon: PokemonLimited;
}

// PokemonCard is used as list item in search results
const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Gradient colors={getGradientByType(pokemon.types[0])}>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        key={pokemon._id}
        h="100px"
      >
        <Text color="white" mr={2} fontSize="16">
          {pokemon.name}
        </Text>
        {pokemon.types.map((type) => (
          <Image
            key={type}
            alt={type}
            width="5"
            height="5"
            source={{ uri: getIconByType(type) }}
          />
        ))}
        <Image
          ml={2}
          borderRadius="xl"
          boxSize="70px"
          resizeMode="cover"
          src={pokemon.imageUrl}
          // Fallback to Bulbasaur if image doesn't load
          fallbackSource={{
            uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
          }}
          alt={pokemon.name}
        />
      </Flex>
    </Gradient>
  );
};

export default PokemonCard;
