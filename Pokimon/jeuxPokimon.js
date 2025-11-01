#!/usr/bin/env node
import readline from 'readline';
import { initPokemonList, choosePlayerPokemon, chooseBotPokemon, getPokemonMovesWithDetails } from './ChoixPokimon.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function startGame() {
  try {
    // Initialiser la liste des pokémons
    await initPokemonList();
    
    // Choix des pokémons
    const playerPokemon = await choosePlayerPokemon();
    console.log(`Vous avez choisi ${playerPokemon}`);
    
    const botPokemon = chooseBotPokemon();
    console.log(`Le bot a choisi ${botPokemon}`);

    // Récupération des moves
    const playerMoves = await getPokemonMovesWithDetails(playerPokemon);
    const botMoves = await getPokemonMovesWithDetails(botPokemon);

    let playerHP = 300;
    let botHP = 300;

    while (playerHP > 0 && botHP > 0) {
      // Afficher les moves disponibles
      console.log("\nVos attaques disponibles:");
      playerMoves.forEach((move, index) => {
        console.log(`${index + 1}. ${move.name} (Puissance: ${move.power})`);
      });

      // Tour du joueur
      await new Promise(resolve => {
        rl.question('Choisissez une attaque (1-5): ', (answer) => {
          const moveIndex = parseInt(answer) - 1;
          if (moveIndex >= 0 && moveIndex < playerMoves.length) {
            const move = playerMoves[moveIndex];
            botHP -= move.power;
            console.log(`Vous utilisez ${move.name}! Il reste ${botHP} HP au bot.`);
          }
          resolve();
        });
      });

      // Tour du bot
      if (botHP > 0) {
        const botMove = botMoves[Math.floor(Math.random() * botMoves.length)];
        playerHP -= botMove.power;
        console.log(`Le bot utilise ${botMove.name}! Il vous reste ${playerHP} HP.`);
      }
    }

    // Fin du jeu
    if (playerHP <= 0) {
      console.log("Vous avez perdu!");
    } else {
      console.log("Vous avez gagné!");
    }

    rl.close();
  } catch (error) {
    console.error('Erreur:', error);
    rl.close();
  }
}

startGame();