interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonState {
  data: Pokemon[];
  loading: boolean;
  error: string | null;
}
