"use client";

import React, { useState } from 'react';
import usePokemonStore from '../hooks/usePokemonStore';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from 'next/image'; // Importing Image component from Next.js

const CaughtPokemonModal = ({ isOpen, onClose }) => {
  const caughtPokemon = usePokemonStore((state) => state.caughtPokemon); // Accessing caught Pokemon from store
  const releasePokemon = usePokemonStore((state) => state.releasePokemon); // Accessing release function from store

  const [currentPage, setCurrentPage] = useState(1); // State for current page in pagination
  const itemsPerPage = 5; // Items to display per page

  if (!isOpen) return null; // If modal is not open, return null

  const handleCloseModal = () => {
    setCurrentPage(1); // Reset to first page when closing
    onClose(); // Call the onClose prop
  };

  // Calculate the indexes for current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = caughtPokemon.slice(indexOfFirstItem, indexOfLastItem); // Slicing the caughtPokemon array for current page

  const totalPages = Math.ceil(caughtPokemon.length / itemsPerPage); // Calculate total pages

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };

  const handleRemove = (pokemon) => {
    releasePokemon(pokemon.id); // Call release function with Pokemon ID
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span> {/* Close button */}
        <h2>Caught Pokemon</h2>
        <ul>
          {currentItems.map((pokemon) => (
            <li key={pokemon.id} className="caught-pokemon-item">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width={50}
                height={50}
              />
              <span>{pokemon.name}</span>
              <button onClick={() => handleRemove(pokemon)}>
                <Image
                  src="https://www.pinclipart.com/picdir/big/92-922332_pokeball-clipart-opened-pokemon-ball-open-png-transparent.png"
                  alt="Remove"
                  width={24}
                  height={24}
                />
              </button>
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <style jsx>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 500px;
          position: relative;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        .caught-pokemon-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 0;
        }
        .caught-pokemon-item img {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default CaughtPokemonModal;
