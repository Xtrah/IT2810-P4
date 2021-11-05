/* eslint-disable no-useless-catch */

import { Pokemon, PokemonAttributes } from '../models/pokemon';

interface QueryOptions {
  name: { $regex: RegExp };
  types?: string;
}

const pokemonResolver = {
  /*
    Return one pokemon according to id
  */
  pokemon: async (args: { _id: string }) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const pokemon = await Pokemon.findById(args._id).exec();
      return pokemon;
    } catch (err) {
      throw err;
    }
  },
  /*
    Return all pokemons or query name or type.
    Sort alphabetically on name by default. Can sort descending.
  */
  pokemons: async (args: {
    name?: string;
    sortDescending?: boolean;
    type?: string;
    offset?: number;
  }) => {
    try {
      /*
        Query doesn't have to be exact as name.
        Query is case insensitive. 
      */
      const queryOptions: QueryOptions = {
        name: { $regex: new RegExp(args.name || '', 'i') },
      };

      if (args.type) {
        queryOptions.types = args.type.toLowerCase();
      }

      const pokemons = await Pokemon.find(queryOptions)
        .limit(10) // Limit number of items per fetch
        .skip(args.offset || 0) // Used for skipping already fetched items.
        .collation({ locale: 'en' }) // Case insensitive sort.
        .sort({ name: args.sortDescending ? -1 : 1 }) // Sort alphabetically by default
        .exec();
      return pokemons;
    } catch (err) {
      throw err;
    }
  },
  // Create a pokemon with certain attributes
  createPokemon: async (args: { pokemonInput: PokemonAttributes }) => {
    const { name, description, types, height, weight, imageUrl } =
      args.pokemonInput;

    const pokemon = Pokemon.build({
      name,
      description,
      types,
      height,
      weight,
      imageUrl,
    });

    try {
      const result = await pokemon.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default pokemonResolver;
