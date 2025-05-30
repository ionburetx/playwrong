import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Buscar películas...' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative max-w-xl w-full mx-auto overflow-visible"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 text-black bg-white border rounded-full shadow-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="hidden px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none flex-shrink-0"
        >
          Buscar
        </button>
        <button
          type="submit"
          className="md:hidden text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none flex items-center justify-center w-10 h-10"
        >
          <FaSearch className="ml-0.5"/>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;