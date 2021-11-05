/* eslint-disable no-unused-vars, no-use-before-define */

import mongoose from 'mongoose';

// Describes attributes for new pokemon
interface PokemonAttributes {
  name: string;
  description: string;
  types: string[];
  weight: number;
  height: number;
  imageUrl: string;
}

interface PokemonModel extends mongoose.Model<PokemonDoc> {
  build(attrs: PokemonAttributes): PokemonDoc;
}

// Mongoose adds document attributes, i.e. created_at
interface PokemonDoc extends mongoose.Document, PokemonAttributes {}

// Type definining for mongodb
const { Schema } = mongoose;
const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  types: [
    {
      type: String,
      required: true,
    },
  ],
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// Use custom build method instead of new Item to support typechecking attributes.
pokemonSchema.statics.build = (attrs: PokemonAttributes) => new Pokemon(attrs);

const Pokemon = mongoose.model<PokemonDoc, PokemonModel>(
  'Pokemon',
  pokemonSchema
);

export { Pokemon, PokemonAttributes, PokemonDoc };
