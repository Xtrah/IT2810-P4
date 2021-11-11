import { pokemonFilterVar } from '../cache';

interface PokemonFilter {
  type: string;
  sortDescending: boolean;
}

const setPokemonFilter = (newFilter: PokemonFilter) => {
  pokemonFilterVar(newFilter);
};

export default setPokemonFilter;
