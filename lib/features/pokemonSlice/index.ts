import { fetchAllPokemonApi } from "@/endpoints";
import { PokemonState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAllPokemon = createAsyncThunk(
  "pokemon/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(fetchAllPokemonApi);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
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
        state.data = action.payload;
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
  },
});

export default pokemonSlice.reducer;
