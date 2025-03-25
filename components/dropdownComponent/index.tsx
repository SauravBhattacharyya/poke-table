"use client";
import { DropdownComponentProps } from "@/types";
import styles from "./styles.module.scss";
import { ChangeEvent } from "react";

export default function DropdownComponent({
  selectedType,
  pokemonTypes,
  handleTypeSearch,
}: DropdownComponentProps) {
  const handleSelectedType = (e: ChangeEvent<HTMLSelectElement>) =>
    handleTypeSearch(e.target.value);

  return (
    <div className={styles.selectWrapper}>
      <select
        className={`${styles.selectFilter} border-2 border-red-500 rounded-full shadow-sm focus:ring-red-200 focus:border-red-200`}
        value={selectedType}
        onChange={handleSelectedType}
      >
        <option value="all">All</option>
        {pokemonTypes.length > 0 &&
          pokemonTypes.map((type) => (
            <option key={type.name} className={styles.selectOption}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
      </select>
    </div>
  );
}
