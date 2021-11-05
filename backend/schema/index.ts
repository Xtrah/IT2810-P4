import { buildSchema } from 'graphql';

const pokemonFields = `
name: String!
description: String!
types: [String!]!
weight: Int!
height: Int!
imageUrl: String!
`;

const schema = buildSchema(`
type Pokemon {
  _id: ID!
  ${pokemonFields}
}

input PokemonInput {
  ${pokemonFields}
}

type RootQuery {
  pokemon(_id: String): Pokemon!
  pokemons(name: String, sortDescending: Boolean, type: String, offset: Int): [Pokemon!]!
}

type RootMutation {
  createPokemon(pokemonInput: PokemonInput): Pokemon
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

export default schema;
