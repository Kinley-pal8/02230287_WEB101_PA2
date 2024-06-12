const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${query}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const data = await response.json();
    return {
      name: data.name,
      type: data.types.map((type) => type.type.name).join(', '), // Extract and join types
      abilities: data.abilities.map((ability) => ability.ability.name), // Extract abilities
      image: data.sprites.front_default // Extract image
      // Add more fields as needed
    };
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return null;
  }
};

export { fetchPokemon };
