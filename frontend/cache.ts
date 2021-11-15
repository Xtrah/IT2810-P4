import { InMemoryCache, makeVar } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import PokemonFilter from './types/pokemonFilter';

/**
 * Handles the filter variables.
 *
 * It allows for saving and retrieval of filter states in the cache.
 * Here we set the initial values for the filter.
 */
export const pokemonFilterVar = makeVar<PokemonFilter>({
  type: '',
  sortDescending: false,
});

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonFilter: {
          read() {
            return pokemonFilterVar();
          },
        },
        // This defines a merge function for paginated results. See https://www.apollographql.com/docs/react/pagination/offset-based/#setting-keyargs-with-offsetlimitpagination
        // Merge depends on offset and limit by default. Parameters are other dependencies.
        pokemons: offsetLimitPagination(['name', 'type', 'sortDescending']),
      },
    },
  },
});
