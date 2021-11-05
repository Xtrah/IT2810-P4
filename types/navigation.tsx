/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Undefined means the component does not use any params.
export type RootStackParamList = {
  Root: undefined;
  CreatePokemonScreen: undefined;
  PokemonCardScreen: { pokemonId: string };
};

// This is to be used for components with navigation properties.
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
