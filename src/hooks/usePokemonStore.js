// Import necessary functions from zustand and zustand/middleware
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define a zustand store with persistence
const usePokemonStore = create(
  // Apply the persist middleware to store state in local storage
  persist(
    (set) => ({
      // State: an array to store caught Pokemon
      caughtPokemon: [],
      
      // Action: catch a new Pokemon
      catchPokemon: (pokemon) => set((state) => {
        // Check if the Pokemon is already caught
        if (state.caughtPokemon.find(p => p.id === pokemon.id)) {
          alert(`${pokemon.name} is already caught!`);
          return state; // Return the current state without changes
        }
        // Add the new Pokemon to the caughtPokemon array
        return { caughtPokemon: [...state.caughtPokemon, pokemon] };
      }),

      // Action: release a Pokemon by its ID
      releasePokemon: (id) => set((state) => ({
        // Filter out the Pokemon with the given ID from the caughtPokemon array
        caughtPokemon: state.caughtPokemon.filter((pokemon) => pokemon.id !== id)
      }))
    }),
    {
      name: 'pokemon-storage', // Name of the item in local storage
      getStorage: () => localStorage, // Specify the storage mechanism (optional)
    }
  )
);

// Export the usePokemonStore hook for usage in components
export default usePokemonStore;
