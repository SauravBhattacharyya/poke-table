import { Pokemon } from "@/types";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function PokemonTable({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <div className={styles.tableWrapper}>
      <table
        className={`${styles.tableOwn} border border-gray-200 rounded-lg shadow-md`}
      >
        <thead className="bg-red-500 text-white uppercase text-sm font-bold">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">More Info</th>
          </tr>
        </thead>
        <tbody>
          {pokemons &&
            pokemons.length > 0 &&
            pokemons.map((pokemon) => (
              <tr
                key={pokemon.id}
                className="border-b border-gray-300 hover:bg-gray-100 transition"
              >
                <td className="px-4 py-3">{pokemon.id}</td>
                <td className="px-4 py-3">
                  <Image
                    src={
                      pokemon.sprites.front_default ||
                      "/assets/images/poke-ball.png"
                    }
                    alt={pokemon.name}
                    width={96}
                    height={96}
                  />
                </td>
                <td className="px-4 py-3 font-medium capitalize">
                  {pokemon.name}
                </td>
                <td className="px-4 py-3 font-medium capitalize">
                  {pokemon.types.map((type) => (
                    <div key={type.slot}>{type.type.name}</div>
                  ))}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/pokemon/${pokemon.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-red-500" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
