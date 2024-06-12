import { useState } from 'react'; // Importing useState hook from React for managing component state
import usePokemonStore from '../hooks/usePokemonStore'; // Importing custom hook to access the Pokemon store
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Importing Alert components from the UI library
import CaughtPokemonModal from './CaughtPokemonModal'; // Importing the CaughtPokemonModal component
import { Button } from '@/components/ui/button'; // Importing the Button component from Shadcn UI

const CaughtPokemonList = () => {
  // Accessing the caughtPokemon state from the Pokemon store using the custom hook
  const caughtPokemon = usePokemonStore((state) => state.caughtPokemon);

  // Defining local state for managing alert and modal visibility
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handler for the button click to view caught Pokemon
  const handleViewCaughtPokemon = () => {
    if (caughtPokemon.length === 0) {
      // If no Pokemon are caught, show the alert
      setShowAlert(true);
    } else {
      // If there are caught Pokemon, show the modal
      setShowModal(true);
    }
  };

  // Handler to close the alert
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="caught-pokemon-list">
      <div className="search-bar">
        {/* Assuming there's a search bar here */}
      </div>
      <div className="button-container">
        <Button onClick={handleViewCaughtPokemon}>View Caught Pokemon</Button> {/* Button to view caught Pokemon */}
      </div>
      
      {showModal && (
        <CaughtPokemonModal isOpen={true} onClose={handleCloseModal} /> // Conditionally render the modal if showModal is true
      )}

      {showAlert && (
        <Alert>
          <AlertTitle>No Pokémon</AlertTitle> {/* Alert title */}
          <AlertDescription>You have not caught any Pokémon yet!</AlertDescription> {/* Alert description */}
          <Button onClick={handleCloseAlert}>Close</Button> {/* Button to close the alert */}
        </Alert>
      )}
    </div>
  );
};

export default CaughtPokemonList;
