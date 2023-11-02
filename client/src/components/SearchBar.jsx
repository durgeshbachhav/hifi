import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="relative  text-gray-600 focus-within:text-gray-400 mt-3">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <FaSearch />
        </button>
      </span>
      <input
        type="text"
        className="py-4 text-sm text-white bg-secondary-color  w-full rounded-lg pl-10 focus:outline-none focus:bg-black focus:text-white"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
