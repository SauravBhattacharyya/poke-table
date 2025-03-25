"use client";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchComponentProps } from "@/types";
import { FormEvent } from "react";

export default function SearchComponent({
  handlePokemonSearch,
  handleSearchTextChange,
  searchVal,
}: SearchComponentProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePokemonSearch();
  };
  return (
    <form className={styles.searchForm} onSubmit={handleFormSubmit}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={searchVal}
          onChange={handleSearchTextChange}
          placeholder="Search Pokemon..."
          className={`${styles.searchInput} py-2 border-2 border-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200 transition-shadow shadow-sm`}
        />
        <button
          type="submit"
          className={`${styles.searchBtn} px-5 py-2 bg-red-500 text-white text-lg font-bold rounded-r-full hover:bg-red-600 transition"`}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}
