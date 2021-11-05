import React from 'react';
import { Text, View } from 'native-base';
import { RootStackScreenProps } from '../types/navigation';

function PokemonCardScreen({
  route,
}: RootStackScreenProps<'PokemonCardScreen'>) {
  const { pokemonId } = route.params;
  // TODO: Add the rest of the detail view
  return (
    <View>
      <Text>Pokemon id {pokemonId}</Text>
    </View>
  );
}

export default PokemonCardScreen;
