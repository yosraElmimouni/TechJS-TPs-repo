// game.js
import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Liste globale des pokémons
let pokemonNames = [];

async function initPokemonList() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    pokemonNames = response.data.results.map(pokemon => pokemon.name);
    return pokemonNames;
  } catch (error) {
    console.error('Erreur lors de la récupération des pokémons:', error);
    throw error;
  }
}

function choosePlayerPokemon() {
  return new Promise((resolve, reject) => {
    console.log("Liste des pokémons disponibles :");
    pokemonNames.forEach(name => {
      console.log(`- ${name}`);
    });

    rl.question('Quel pokémon choisissez-vous ? ', (reponse) => {
      if (pokemonNames.includes(reponse.toLowerCase())) {
        resolve(reponse.toLowerCase());
      } else {
        reject("Pokémon invalide");
      }
    });
  });
}

function chooseBotPokemon() {
  const randomIndex = Math.floor(Math.random() * pokemonNames.length);
  return pokemonNames[randomIndex];
}

async function getPokemonMovesWithDetails(pokemonName, maxMoves = 5) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const movesArr = response.data.moves.slice(0, maxMoves);
    
    return movesArr.map(move => ({
      name: move.move.name,
      power: move.move.power 
    }));
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

export { initPokemonList, choosePlayerPokemon, chooseBotPokemon, getPokemonMovesWithDetails };

