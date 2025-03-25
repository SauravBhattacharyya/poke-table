"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";
import { PaginationProps } from "@/types";

export default function Pagination({
  limit,
  offset,
  loading,
  changePageSize,
  handleNextPage,
  handlePrevPage,
}: PaginationProps) {
  const pageSizes = ["10", "20", "50", "100"];

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    changePageSize(parseInt(e.target.value));

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-300 shadow-md rounded-lg">
      <div className="flex items-center space-x-2">
        <p className="text-gray-700 font-medium">Page Size</p>
        <select
          value={limit}
          onChange={handlePageSizeChange}
          className="border border-gray-300 rounded-md px-3 py-1 cursor-pointer focus:ring focus:ring-blue-400 transition-all"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <button
          onClick={handlePrevPage}
          disabled={offset === 0 || loading}
          className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 
                     hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
          <span>Prev Page</span>
        </button>

        <button
          onClick={handleNextPage}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 
                     hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next Page</span>
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
}
