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
  setOffset,
  setSearchVal,
  setSelectedType,
} from "@/lib/features/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChangeEvent, useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const {
    pokemonTypes,
    offset,
    pokemons,
    error,
    loading,
    limit,
    searchVal,
    selectedType,
  } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchAllPokemon());
    dispatch(fetchPokemonTypes());
  }, [dispatch]);

  const handlePokemonSearch = () => dispatch(searchPokemon());

  const handleTypeSearch = (val: string) => {
    dispatch(setSelectedType(val));
    if (val === "all") dispatch(fetchAllPokemon());
    else dispatch(fetchPokemonByType(val));
  };

  const changePageSize = (selectedSize: number) => {
    dispatch(setLimit(selectedSize));
    dispatch(setOffset(0));
    if (selectedType === "all") {
      dispatch(fetchAllPokemon());
    } else {
      dispatch(fetchPokemonByType(selectedType));
    }
  };

  const handleNextPage = () => {
    dispatch(nextPage());
    if (selectedType === "all") {
      dispatch(fetchAllPokemon());
    } else {
      dispatch(fetchPokemonByType(selectedType));
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      dispatch(prevPage());
      if (selectedType === "all") {
        dispatch(fetchAllPokemon());
      } else {
        dispatch(fetchPokemonByType(selectedType));
      }
    }
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchVal(e.target.value));

  return (
    <main>
      <h1 className="text-5xl text-center">Find Your Favorite Pokémon</h1>
      {loading ? (
        <Loader />
      ) : (
        <section className="my-5">
          <div className="flex items-center justify-between my-8">
            <SearchComponent
              searchVal={searchVal}
              handlePokemonSearch={handlePokemonSearch}
              handleSearchTextChange={handleSearchTextChange}
            />
            <DropdownComponent
              selectedType={selectedType}
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
                searchVal={searchVal}
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
