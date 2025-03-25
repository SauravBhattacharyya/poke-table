/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchPokemonDetails } from "@/lib/features/pokemonSlice";

export default function PokemonDetails() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { singlePokemon } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonDetails(id as string));
    }
  }, [id, dispatch]);

  if (!singlePokemon) {
    return <div className="text-center text-red-500">Pokémon not found!</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg border-4 border-yellow-400">
      <button
        onClick={() => router.back()}
        className="text-white bg-red-600 px-4 py-2 rounded-md flex items-center mb-4 hover:bg-red-700 transition cursor-pointer"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </button>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 capitalize">
          {singlePokemon.name}
        </h1>
        <Image
          src={
            singlePokemon.sprites.front_default ||
            "/assets/images/poke-ball.png"
          }
          alt={singlePokemon.name}
          width={128}
          height={128}
          className="w-32 h-32 bg-gray-100 rounded-full border-4 border-yellow-400 shadow-md"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Stats</h2>
        <table className="w-full border-collapse border border-yellow-400">
          <thead>
            <tr className="bg-yellow-300 text-black">
              <th className="border border-yellow-600 px-4 py-2">Stat</th>
              <th className="border border-yellow-600 px-4 py-2">Base Value</th>
            </tr>
          </thead>
          <tbody>
            {singlePokemon.stats.map((s: any) => (
              <tr key={s.stat.name} className="text-center bg-gray-100">
                <td className="border border-yellow-600 px-4 py-2 capitalize">
                  {s.stat.name}
                </td>
                <td className="border border-yellow-600 px-4 py-2">
                  {s.base_stat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Abilities</h2>
        <ul className="bg-gray-100 p-4 rounded-lg border-2 border-yellow-400">
          {singlePokemon.abilities.map((a: any) => (
            <li
              key={a.ability.name}
              className="capitalize text-lg text-gray-800"
            >
              {a.ability.name} {a.is_hidden && "(Hidden Ability)"}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Moves</h2>
        <div className="bg-white p-4 border-2 border-red-400 rounded-lg shadow-md max-h-40 overflow-y-auto">
          <ul className="grid grid-cols-2 gap-2">
            {singlePokemon.moves.map((m: any) => (
              <li
                key={m.move.name}
                className="text-gray-800 bg-gray-200 px-3 py-1 rounded-md"
              >
                {m.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
