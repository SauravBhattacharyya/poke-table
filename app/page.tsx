"use client";
import DropdownComponent from "@/components/dropdownComponent";
import Loader from "@/components/loader";
import Pagination from "@/components/pagination";
import PokemonTable from "@/components/pokemonTable";
import SearchComponent from "@/components/searchComponent";
import { fetchAllPokemon, searchPokemon } from "@/lib/features/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { pokemons, error, loading } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, [dispatch]);

  const handlePokemonSearch = (searchVal: string) =>
    dispatch(searchPokemon(searchVal));

  return (
    <main>
      <h1 className="text-5xl text-center">Find Your Favorite Pokémon</h1>
      {loading ? (
        <Loader />
      ) : (
        <section className="my-5">
          <div>
            <SearchComponent handlePokemonSearch={handlePokemonSearch} />
            <DropdownComponent />
          </div>
          {error ? (
            <p className="text-center text-red-500">Failed to load Pokémon!</p>
          ) : (
            <div>
              <PokemonTable pokemons={pokemons} />
              <Pagination />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
