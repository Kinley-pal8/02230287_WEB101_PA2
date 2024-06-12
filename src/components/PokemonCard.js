import React, { useState, useEffect } from 'react';
import usePokemonStore from '../hooks/usePokemonStore';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const PokemonCard = ({ pokemon }) => {
  const catchPokemon = usePokemonStore((state) => state.catchPokemon);
  const caughtPokemon = usePokemonStore((state) => state.caughtPokemon);
  const { toast } = useToast();
  const [isShaking, setIsShaking] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const isCaught = caughtPokemon.some(p => p.id === pokemon.id);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
      const data = await response.json();
      setPokemonDetails(data);
    };
    fetchPokemonDetails();
  }, [pokemon.id]);

  const handleCatch = () => {
    if (isCaught) {
      alert(`${pokemon.name} is already caught!`);
    } else {
      catchPokemon(pokemon);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      toast({
        title: "Success!",
        description: `${pokemon.name} caught successfully!`
      });
    }
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  const handleLoadMore = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  const abilities = pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');

  return (
    <div className="pokemon-card" style={{ backgroundColor: '	#808080' }}>
      <div className="card-header">
        <h3 className="card-title">
          {pokemon.name}
          <img
            src={isCaught ? "https://www.pinclipart.com/picdir/big/548-5488263_pokeball-pokemon-ball-png-images-free-download-pokemon.png" : "https://cdn.pixabay.com/photo/2019/11/18/15/46/pokemon-4635112_1280.png"}
            alt={isCaught ? "Caught" : "Catch"}
            onClick={handleCatch}
            className="catch-button"
          />
        </h3>
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        className={`pokemon-image ${isShaking ? 'shake' : ''}`}
        onClick={handleClick}
      />
      {showDetails && pokemonDetails && (
        <div className="card-content">
          <h4 className="highlight-title">Types</h4>
          <p>{pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
          <h4 className="highlight-title">Stats</h4>
          <ul>
            {pokemonDetails.stats.map(stat => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
          <h4 className="highlight-title">Moves</h4>
          {showMoreDetails ? (
            <p>{pokemonDetails.moves.map(move => move.move.name).join(', ')}</p>
          ) : (
            <p>{pokemonDetails.moves.slice(0, 5).map(move => move.move.name).join(', ')}</p>
          )}
          <Button variant="outline" onClick={handleLoadMore}>
            {showMoreDetails ? 'Show Less' : 'Load More'}
          </Button>
        </div>
      )}
      <style jsx>{`
        .pokemon-card {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin: 10px;
          width: calc(25% - 20px);
          box-sizing: border-box;
          display: inline-block;
          overflow: hidden;
        }
        .pokemon-image {
          width: 100%;
          height: auto;
          margin-bottom: 10px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          transition: transform 0.5s ease;
          cursor: pointer;
        }
        .catch-button {
          width: 30px;
          height: 30px;
          cursor: pointer;
          margin-left: 10px;
        }
        .shake {
          animation: shake 0.5s;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
          100% { transform: translateX(0); }
        }
        .highlight-title {
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PokemonCard;
