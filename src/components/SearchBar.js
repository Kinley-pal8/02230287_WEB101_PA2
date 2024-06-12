"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <h1></h1>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokemon"
        className="search-input"
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch} className="search-button">Search</Button>
      <style jsx>{`
        .search-bar-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .search-input {
          flex: 1;
        }
        .search-button {
          background-color: #4CAF50;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;