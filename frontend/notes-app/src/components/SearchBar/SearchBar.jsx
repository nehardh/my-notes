import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div
      className={`flex items-center rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 w-full 
      bg-white/60 backdrop-blur-lg border border-blue-100 shadow-sm 
      focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 
      transition-all duration-300`}
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Search Notes..."
        className="flex-grow bg-transparent text-sm sm:text-base outline-none text-gray-700 placeholder:text-gray-400"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={onClearSearch}
          className="text-slate-400 hover:text-gray-700 mr-2 transition-colors duration-200"
          aria-label="Clear Search"
        >
          <IoMdClose className="text-lg sm:text-xl" />
        </button>
      )}

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="text-slate-400 hover:text-blue-600 transition-transform duration-200 hover:scale-110"
        aria-label="Search"
      >
        <FaMagnifyingGlass className="text-lg sm:text-xl" />
      </button>
    </div>
  );
};

export default SearchBar;
