// "use client" directive for Next.js to use client-side rendering
"use client";

// Import necessary modules and components
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import CaughtPokemonList from '../components/CaughtPokemonList';
import { fetchPokemon } from '../services/fetchHandler';
import '../styles/index.css';

// Define the number of Pokémon displayed per page
const PAGE_SIZE = 36;

const HomePage = () => {
  // State to store the list of Pokémon
  const [pokemonList, setPokemonList] = useState([]);
  // State to store the current offset for loading more Pokémon
  const [currentOffset, setCurrentOffset] = useState(0);
  // State to store the searched Pokémon
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  // State to store whether there are more Pokémon to load
  const [hasMore, setHasMore] = useState(true);

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
        setHasMore(false); // No more Pokémon to load after searching
      } else {
        // Fetch data for the next page of Pokémon list
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${PAGE_SIZE}`);
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
        setPokemonList((prevList) => [...prevList, ...detailedPokemonData]); // Append the new Pokémon data to the existing list
        setCurrentOffset((prevOffset) => prevOffset + PAGE_SIZE); // Update the current offset
        setHasMore(pokemonData.next !== null); // Check if there are more Pokémon to load
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }, [currentOffset, searchedPokemon]);

  // useEffect hook to fetch the initial Pokémon list when the component mounts
  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  // Function to handle loading more Pokémon
  const handleLoadMore = () => {
    fetchPokemonList();
  };

  // Function to handle search input
  const handleSearch = async (query) => {
    setSearchedPokemon(query.toLowerCase()); // Set the searched Pokémon to the input query
    setPokemonList([]); // Clear the existing Pokémon list
    setCurrentOffset(0); // Reset the current offset
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
      {hasMore && (
        <button onClick={handleLoadMore}>Load More</button> // "Load More" button to load more Pokémon
      )}
    </div>
  );
};

// Export the HomePage component as the default export
export default HomePage;