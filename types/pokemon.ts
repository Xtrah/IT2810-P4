export interface PokemonLimited {
  _id: string;
  name: string;
  description: string;
  types: string[];
  imageUrl: string;
}

export interface Pokemon extends PokemonLimited {
  weight: number;
  height: number;
}
