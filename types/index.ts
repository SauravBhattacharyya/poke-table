type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
}

export interface PokemonState {
  limit: number;
  offset: number;
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singlePokemon: any | null;
}

export interface SearchComponentProps {
  handlePokemonSearch: (searchVal: string) => void;
}
