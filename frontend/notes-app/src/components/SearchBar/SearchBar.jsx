import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center bg-slate-200 rounded-xl px-3 py-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="flex-grow bg-transparent text-sm outline-none placeholder:text-slate-500"
        value={value}
        onChange={onChange}
      />

      {/* Clear button */}
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-2"
          onClick={onClearSearch}
        />
      )}

      {/* Search icon */}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
