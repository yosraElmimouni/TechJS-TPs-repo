let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();




let isAutoPlaying = false;
let autoTimeoutId;
  /*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */
 document.addEventListener("keydown",(event)=>{
    if(event.key ==="r"){
      playGame('rock')
    }
    else if(event.key ==="s"){
      playGame('scissors')
    }
    else if(event.key ==="p"){
      playGame('paper')
    }

 });



const playerMove1 = pickPlayerMove();
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  
  if(computerMove === playerMove )
  {
    score.ties++ ;
    console.log('you are equals')
  }
  else if((computerMove === 'scissors' && playerMove ==="rock") || (computerMove === 'paper' && playerMove ==="scissors")||(computerMove === 'rock' && playerMove ==="paper") ){
    score.wins++;
  }
  else{
    score.losses++;
  }
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".js-moves").innerHTML= `<img src="images/${computerMove}-emoji.png" class="move-icon">         <img src="images/${playerMove}-emoji.png" class="move-icon">`;
  updateScoreElement();


  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"

}

function playGameAuto(playerMove1) {
  // Toggle autoplay using the same button
  if (!isAutoPlaying) {
    isAutoPlaying = true;
    playAuto(playerMove1);
  } else {
    isAutoPlaying = false;
    clearTimeout(autoTimeoutId);
  }
}

function playAuto(playerMove1) {
  const computerMove = pickComputerMove();
  
  if(computerMove === playerMove1 )
  {
    score.ties++ ;
    console.log('you are equals')
  }
  else if((computerMove === 'scissors' && playerMove1 ==="rock") || (computerMove === 'paper' && playerMove1 ==="scissors")||(computerMove === 'rock' && playerMove1 ==="paper") ){
    score.wins++;
  }
  else{
    score.losses++;
  }
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".js-moves").innerHTML= `<img src="images/${computerMove}-emoji.png" class="move-icon">         <img src="images/${playerMove1}-emoji.png" class="move-icon">`;
  updateScoreElement();

  if (isAutoPlaying) {
      autoTimeoutId = setTimeout(playAuto, 1000, playerMove1);
  }
}



function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}


function pickPlayerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}