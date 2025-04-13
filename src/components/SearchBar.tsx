
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search books, authors, users..."
        className="pl-10 pr-4 py-2.5 w-full bg-gray-100 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-bookMingle-primary"
      />
    </div>
  );
};

export default SearchBar;
