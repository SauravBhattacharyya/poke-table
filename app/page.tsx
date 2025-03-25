"use client";
import DropdownComponent from "@/components/dropdownComponent";
import Loader from "@/components/loader";
import Pagination from "@/components/pagination";
import PokemonTable from "@/components/pokemonTable";
import SearchComponent from "@/components/searchComponent";
import {
  fetchAllPokemon,
  fetchPokemonByType,
  fetchPokemonTypes,
  nextPage,
  prevPage,
  searchPokemon,
  setLimit,
} from "@/lib/features/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const { pokemonTypes, offset, pokemons, error, loading, limit } =
    useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchAllPokemon());
    dispatch(fetchPokemonTypes());
  }, [dispatch]);

  const handlePokemonSearch = (searchVal: string) =>
    dispatch(searchPokemon(searchVal));

  const handleTypeSearch = (selectedType: string) => {
    if (selectedType === "all") dispatch(fetchAllPokemon());
    else dispatch(fetchPokemonByType(selectedType));
  };

  const changePageSize = (selectedSize: number) => {
    dispatch(setLimit(selectedSize));
    dispatch(fetchAllPokemon());
  };

  const handleNextPage = () => {
    dispatch(nextPage());
    dispatch(fetchAllPokemon());
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      dispatch(prevPage());
      dispatch(fetchAllPokemon()); // Fetch new page data
    }
  };

  return (
    <main>
      <h1 className="text-5xl text-center">Find Your Favorite Pokémon</h1>
      {loading ? (
        <Loader />
      ) : (
        <section className="my-5">
          <div className="flex items-center justify-between my-8">
            <SearchComponent handlePokemonSearch={handlePokemonSearch} />
            <DropdownComponent
              pokemonTypes={pokemonTypes}
              handleTypeSearch={handleTypeSearch}
            />
          </div>
          {error ? (
            <p className="text-center text-red-500">Failed to load Pokémon!</p>
          ) : (
            <div>
              <PokemonTable pokemons={pokemons} />
              <Pagination
                limit={limit}
                offset={offset}
                loading={loading}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                changePageSize={changePageSize}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
