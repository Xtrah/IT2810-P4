import React from 'react';
import { Text, View } from 'native-base';
import { RootStackScreenProps } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';

function PokemonCardScreen({
  route,
}: RootStackScreenProps<'PokemonCardScreen'>) {
  const { pokemonId } = route.params;
  // TODO: Add the rest of the detail view
  return (
    <ScreenWrapper>
      <View>
        <Text>Pokemon id {pokemonId}</Text>
      </View>
    </ScreenWrapper>
  );
}

export default PokemonCardScreen;
