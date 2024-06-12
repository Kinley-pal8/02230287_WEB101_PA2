// "use client" directive for Next.js to use client-side rendering
"use client";

// Import necessary modules and components
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import PaginationComponent from '../components/Pagination';
import CaughtPokemonList from '../components/CaughtPokemonList';
import { fetchPokemon } from '../services/fetchHandler';
import '../styles/index.css';

// Define the number of Pokémon displayed per page
const PAGE_SIZE = 36;

const HomePage = () => {
  // State to store the list of Pokémon
  const [pokemonList, setPokemonList] = useState([]);
  // State to store the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State to store the searched Pokémon
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  // State to store the total number of pages
  const [totalPages, setTotalPages] = useState(0);

  // Function to fetch the list of Pokémon
  const fetchPokemonList = useCallback(async () => {
    try {
      if (searchedPokemon) {
        // Fetch data for a specific Pokémon if searched
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`);
        if (!data.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const pokemonData = await data.json();
        setPokemonList([pokemonData]); // Set the searched Pokémon data to the state
      } else {
        // Calculate the offset for pagination
        const offset = (currentPage - 1) * PAGE_SIZE;
        // Fetch data for the current page of Pokémon list
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);
        if (!data.ok) {
          throw new Error('Failed to fetch Pokémon list');
        }
        const pokemonData = await data.json();
        // Fetch detailed data for each Pokémon
        const detailedPokemonData = await Promise.all(
          pokemonData.results.map(async (pokemon) => {
            const pokemonDetails = await fetch(pokemon.url);
            return pokemonDetails.json();
          })
        );
        setPokemonList(detailedPokemonData); // Set the detailed Pokémon data to the state
        setTotalPages(Math.ceil(pokemonData.count / PAGE_SIZE)); // Calculate and set the total number of pages
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }, [currentPage, searchedPokemon]);

  // useEffect hook to fetch the Pokémon list when the component mounts or when currentPage or searchedPokemon changes
  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Set the current page to the selected page
    setSearchedPokemon(null); // Clear the searched Pokémon
  };

  // Function to handle search input
  const handleSearch = async (query) => {
    setSearchedPokemon(query.toLowerCase()); // Set the searched Pokémon to the input query
    setCurrentPage(1); // Reset to the first page
  };

  // Render the component
  return (
    <div className="home-page">
      <h1 className="title">PokeDex</h1> {/* Set class name to style the title */}
      <SearchBar onSearch={handleSearch} /> {/* Search bar component */}
      <CaughtPokemonList /> {/* List of caught Pokémon component */}
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} /> // Render a card for each Pokémon
        ))}
      </div>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange} // Pagination component for navigating pages
      />
    </div>
  );
};

// Export the HomePage component as the default export
export default HomePage;
