/**
 * Used React Navigation for navigation:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import React from 'react';

import SearchScreen from '../screens/SearchScreen';
import { RootStackParamList } from '../types/navigation';
import CreatePokemonScreen from '../screens/CreatePokemonScreen';
import { Icon, IconButton, Image } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import PokemonCardScreen from '../screens/PokemonCardScreen';
import { Pressable } from 'react-native';
// Import didn't work with TS, so using require.
const pokemonball = require('../assets/images/pokemonball.png');

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      // Screen options involve customizing nav bar
      screenOptions={({ navigation }) => ({
        headerLeft: () => null, // Remove back button
        headerTitle: () => {
          return (
            <Pressable
              accessibilityLabel="Navigate to home page"
              onPress={() => navigation.navigate('Root')}
            >
              <Image
                ml={2}
                borderRadius="xl"
                boxSize="30px"
                resizeMode="cover"
                src={pokemonball}
                alt="pokeball home button"
              />
            </Pressable>
          );
        },
        headerRight: () => {
          return (
            <IconButton
              aria-label="Search for pokemon"
              onPress={() => navigation.navigate('CreatePokemonScreen')}
              icon={<Icon as={MaterialIcons} name="add-box" />}
              _icon={{
                color: 'red.500',
                size: 'xl',
              }}
              _hover={{
                bg: 'red.500:alpha.20',
              }}
            />
          );
        },
      })}
    >
      {/* The stack screens are the available routes. Names are used to reference in navigation */}
      <Stack.Screen
        name="Root"
        component={SearchScreen}
        options={{ title: 'Pokedex' }}
      />
      <Stack.Screen
        name="CreatePokemonScreen"
        component={CreatePokemonScreen}
        options={{ title: 'Create Pokemon' }}
      />
      <Stack.Screen
        name="PokemonCardScreen"
        component={PokemonCardScreen}
        options={{ title: 'Pokemon card' }}
      />
    </Stack.Navigator>
  );
}

// This is put in root of the application to offer the navigation
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
