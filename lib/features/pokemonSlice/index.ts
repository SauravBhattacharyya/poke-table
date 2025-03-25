import { fetchAllPokemonApi, searchPokemonApi } from "@/endpoints";
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
};

export const fetchAllPokemon = createAsyncThunk(
  "pokemon/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { limit } = (getState() as RootState).pokemon;
      const urls = Array.from(
        { length: limit },
        (_, i) => `${fetchAllPokemonApi}/${i + 1}`
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
  async (searchVal: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${searchPokemonApi}/${searchVal}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
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
  },
});

export default pokemonSlice.reducer;
