import {
  fetchAllPokemonApi,
  pokemonTypesApi,
  searchPokemonApi,
} from "@/endpoints";
import { RootState } from "@/lib/store";
import { PokemonState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
  singlePokemon: null,
  limit: 20,
  offset: 0,
  pokemonTypes: [],
  searchVal: "",
  selectedType: "all",
};

export const fetchAllPokemon = createAsyncThunk(
  "pokemon/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { limit, offset } = (getState() as RootState).pokemon;
      const urls = Array.from(
        { length: limit },
        (_, i) => `${fetchAllPokemonApi}/${offset + i + 1}`
      );
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      return responses.map((response) => response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const searchPokemon = createAsyncThunk(
  "pokemon/search",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { searchVal } = (getState() as RootState).pokemon;
      const response = await axios.get(`${searchPokemonApi}/${searchVal}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchPokemonTypes = createAsyncThunk(
  "pokemon/types",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${pokemonTypesApi}?limit=50`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchPokemonByType = createAsyncThunk(
  "pokemon/searchByType",
  async (searchVal: string, { getState, rejectWithValue }) => {
    try {
      const { limit, offset } = (getState() as RootState).pokemon;
      const pokemonResponse = await axios.get(
        `${pokemonTypesApi}/${searchVal}`
      );
      const pokemonList: { name: string; url: string }[] =
        pokemonResponse.data.pokemon.map(
          (p: { pokemon: { name: string; url: string } }) => p.pokemon
        );
      const paginatedPokemon = pokemonList.slice(offset, offset + limit);
      const detailedPokemon = await Promise.all(
        paginatedPokemon.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url);
          return detailsResponse.data;
        })
      );
      return detailedPokemon;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.offset = 0;
    },
    nextPage: (state) => {
      state.offset += state.limit;
    },
    prevPage: (state) => {
      state.offset = Math.max(0, state.offset - state.limit);
    },
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
      state.searchVal = "";
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(fetchAllPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.pokemons = [action.payload];
        state.selectedType = "all";
        state.loading = false;
        state.error = null;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.pokemonTypes = action.payload.results;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(fetchPokemonTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder
      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(fetchPokemonByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const {
  setLimit,
  nextPage,
  prevPage,
  setSearchVal,
  setSelectedType,
  setOffset,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
