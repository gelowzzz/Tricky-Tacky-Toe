var origBoard;
const player1 = 'X';
const player2 = 'O';
let currentPlayer;
let isAIPlayer;
let aiDifficulty;
let player1Wins = 0;
let player2Wins = 0;
let draws = 0;
let tabledisplay = false;

const winCombos = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [0, 6, 12, 18, 24],
    [1, 7, 13, 19, 25],
    [2, 8, 14, 20, 26],
    [3, 9, 15, 21, 27],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29],
    [18, 25],
    [12, 19, 26],
    [6, 13, 20, 27],
    [0, 7, 14, 21, 28],
    [1, 8, 15, 22, 29],
    [2, 9, 16, 23],
    [3, 10, 17],
    [4, 11],
    [1, 6],
    [2, 7, 12],
    [3, 8, 13, 18],
    [24, 19, 14, 9 ,4],
    [25, 20, 15, 10, 5],
    [26, 21, 16, 11],
    [27, 22, 17],
    [28, 23]
];

const table = document.querySelector('table');
const cells = document.querySelectorAll('.cell');
//table.addEventListener('click', turnClick);
document.querySelector('#scoreboard').style.visibility = 'Hidden';
document.querySelector('#table').style.visibility = 'Hidden';
document.querySelector('.returndiv').style.visibility = 'Hidden';

//edited to basically be the same as startGame() function
function btnreturn() {
	origBoard = Array.from(Array(6 * 5).keys());
    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
	updateScoreboard();
	document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.pickgamemode').style.display = 'none';
	document.querySelector('.roundwin').style.display = 'none';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
    getPlayerMode();
}

var btnexitgm = document.getElementById("exgm");
btnexitgm.addEventListener("click", function(){
  document.querySelector('.pickgamemode').style.display = 'none';
  document.querySelector('.startpage').style.display = 'block';
});

var btnexitam = document.getElementById("exaim");
btnexitam.addEventListener("click", function(){
  document.querySelector('.aimode').style.display = 'none';
  document.querySelector('.pickgamemode').style.display = 'block';
});



function clearboard() {
	
	for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].classList.remove('win-cell');
		cells[i].addEventListener('click', turnClick, false);
    }
}


const scoreboard = document.getElementById('scoreboard');
scoreboard.innerHTML = `Player 1: ${player1Wins} | Player 2: ${player2Wins} | Draws: ${draws}`;



function startGame() {
    origBoard = Array.from(Array(6 * 5).keys());
    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
	updateScoreboard();
	document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.pickgamemode').style.display = 'none';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
    getPlayerMode();
}


function getPlayerMode() {
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
	
	document.querySelector('.pickgamemode').style.display = 'block';
	document.querySelector('.startpage').style.display = 'none';
	var btnAI = document.getElementById("AI")
	var btnLocal = document.getElementById("local")
  

  btnAI.addEventListener("click", function(){
    isAIPlayer = true;
    getAIDifficulty();
  });

  btnLocal.addEventListener("click", function(){
    isAIPlayer = false;
    currentPlayer = player1;
	document.querySelector('#scoreboard').style.visibility = 'visible';
	document.querySelector('#table').style.visibility = 'visible';
	document.querySelector('.returndiv').style.visibility = 'visible';
    initGame();
  });

    /*const mode = prompt("Choose game mode: '1' for 2 players, '2' for AI");
    if (mode === '1') {
        isAIPlayer = false;
        currentPlayer = player1;
        initGame();
    } else if (mode === '2') {
        isAIPlayer = true;
        getAIDifficulty();
    } else {
        alert("Invalid choice. Please choose '1' for 2 players or '2' for AI.");
        getPlayerMode();
    }*/
}

function getAIDifficulty() {
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
	document.querySelector('.pickgamemode').style.display = 'none';
	document.querySelector('.aimode').style.display = 'block';

	var btnEasy = document.getElementById("easy")
	var btnMedium = document.getElementById("medium")
	var btnHard = document.getElementById("hard")
  

	btnEasy.addEventListener("click", function(){
		document.querySelector('#scoreboard').style.visibility = 'visible';
		document.querySelector('#table').style.visibility = 'visible';
		document.querySelector('.returndiv').style.visibility = 'visible';
		aiDifficulty = "easy";
		initGame();
		document.querySelector('.aimode').style.display = 'none';
	});

	btnMedium.addEventListener("click", function(){
		document.querySelector('#scoreboard').style.visibility = 'visible';
		document.querySelector('#table').style.visibility = 'visible';
		document.querySelector('.returndiv').style.visibility = 'visible';
		aiDifficulty = "medium";
		initGame();
		document.querySelector('.aimode').style.display = 'none';
	});
	  
	btnHard.addEventListener("click", function(){
		document.querySelector('#scoreboard').style.visibility = 'visible';
		document.querySelector('#table').style.visibility = 'visible';
		document.querySelector('.returndiv').style.visibility = 'visible';
		aiDifficulty = "hard";
		initGame();
		document.querySelector('.aimode').style.display = 'none';
	});

    /*aiDifficulty = prompt("Choose AI difficulty: 'easy', 'medium', or 'hard'");
    if (aiDifficulty !== 'easy' && aiDifficulty !== 'medium' && aiDifficulty !== 'hard') {
        alert("Invalid difficulty. Please choose 'easy', 'medium', or 'hard'.");
        getAIDifficulty();
    } else {
        currentPlayer = player1;
        initGame();
    }*/
}

function initGame() {
  document.querySelector('.roundwin').style.display = 'none';
  document.querySelector('.pickgamemode').style.display = 'none';
  currentPlayer = player1;

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].classList.remove('win-cell');
        cells[i].addEventListener('click', turnClick, false);
    }

    if (isAIPlayer && currentPlayer === player2) {
      aiMove();
      checkGameOver(); // Ensure checkGameOver is called after AI move
  } 
}

function turnClick(event) {
    const cellId = event.target.id;
    if (typeof origBoard[cellId] === 'number' && !checkWin(origBoard, player1) && !checkWin(origBoard, player2)) {
        turn(cellId, currentPlayer);

        if (checkWin(origBoard, currentPlayer)) {
            declareWinner(`${currentPlayer}`);
        } else if (checkTie()) {
            declareWinner("It's a Draw!");
        }

        currentPlayer = (currentPlayer === player1) ? player2 : player1;

        if (isAIPlayer && currentPlayer === player2 && !checkWin(origBoard, player1) && !checkWin(origBoard, player2) && !checkTie()) {
            aiMove();
            //checkGameOver();  //cause of double increment in Draw updatescoreboard
        }
    }
}

function aiMove() {
    if (aiDifficulty === 'easy') {
        easyAIMove();
    } else if (aiDifficulty === 'medium') {
        mediumAIMove();
    } else if (aiDifficulty === 'hard') {
        hardAIMove();
    }
}

//easy mode just makes random moves
function easyAIMove() {
    const emptySquaresArray = emptySquares();
    const randomIndex = Math.floor(Math.random() * emptySquaresArray.length);
    const aiMove = emptySquaresArray[randomIndex];
    turn(aiMove, player2);
    checkGameOver();
}

// medium ai makes sure to make winning moves first then block
function mediumAIMove() {
	
    // AI will block a move
    const blockingMove = findWinningMove(player1);
    if (blockingMove !== -1) {
        turn(blockingMove, player2);
	
	// Else it will make a random move
    } else {
      const emptySquaresArray = emptySquares();
      const randomIndex = Math.floor(Math.random() * emptySquaresArray.length);
      const aiMove = emptySquaresArray[randomIndex];
      turn(aiMove, player2);
    }
	
    checkGameOver();
}

//hard ai will block move first then for a winning move, if it can't make both it will make a move towards a winning move
function hardAIMove() {
	
	// If no winning move, block the opponent's winning move
    const blockWinningMove = findWinningMove(player1);
    if (blockWinningMove !== -1) {
    turn(blockWinningMove, player2);
    } else {
		
        // If there's a winning move, make it
		const winningMove = findWinningMove(player2);
		if (winningMove !== -1) {
        turn(winningMove, player2);
        } else {
			
            // If no winning or blocking move, attempt to set up a winning move on the next turn
            const setupWinningMove = findSetupWinningMove(player2);
            if (setupWinningMove !== -1) {
                turn(setupWinningMove, player2);
            } else {
                // If none of the above, make a random move
                easyAIMove();
            }
        }
    }

    checkGameOver();
}

function findWinningMove(player) {
    for (let i = 0; i < origBoard.length; i++) {
        if (typeof origBoard[i] === 'number') {
            origBoard[i] = player;
            if (checkWin(origBoard, player)) {
                origBoard[i] = i; // Reset the board
                return i;
            }
            origBoard[i] = i; // Reset the board
        }
    }
    return -1;
}

function findSetupWinningMove(player) {
    for (let i = 0; i < origBoard.length; i++) {
        if (typeof origBoard[i] === 'number') {
            origBoard[i] = player;
            const setupWinningMove = findWinningMove(player);
            origBoard[i] = i; // Reset the board

            if (setupWinningMove !== -1) {
                return i;
            }
        }
    }
    return -1;
}


function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	document.getElementById(squareId).removeEventListener('click', turnClick, false);
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let win of winCombos) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { player: player , index: win };
            break;
        }
    }
	
    return gameWon;
}

function gameOver(gameWon) {
    const winningCombination = gameWon.index;

    for (let i = 0; i < winningCombination.length; i++) {
        const index = winningCombination[i];
        document.getElementById(index).classList.add('win-cell');
    }

    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }

	if (gameWon.player == player1 || gameWon.player == player2) {
        updateScore(gameWon.player);
        declareWinner(`${gameWon.player}`);
    } else {

        //updateScore('draw'); //added logic to update scoreboard !--changed draw to draws??
        declareWinner();
        document.querySelector('.roundwin').style.display = 'block';
        document.querySelector('.roundwin .text1').innerText = 'Draw!';
        
    }
}

//edited function
function declareWinner(who) {

	currentPlayer = player1;

	if (player1Wins === 5 || player2Wins === 5) {
    
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = "Player " + who + " Wins the Game!";
    
    // If one player wins 5 games, ask for a rematch
    /*const rematch = confirm('We have a winner! Do you want to play again?' + currentPlayer);
    if (rematch) {
        player1Wins = 0;
        player2Wins = 0;
        draws = 0;
        updateScoreboard();
        initGame();

    } else {
        startGame();
    }*/
	
	} else if (checkTie()) {
		updateScore('draw')
		document.querySelector('.roundwin').style.display = 'block';
		document.querySelector('.roundwin .text1').innerText = who;

	} else {
		document.querySelector('.roundwin').style.display = 'block';
		document.querySelector('.roundwin .text1').innerText = "Player " + who + " Wins this Round!";
	}

		/*setTimeout(() => {
			startGameRound();
		}, 500); // Delay before resetting the game*/
}

function startGameRound(){
    document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.roundwin').style.display = 'none';
    origBoard = Array.from(Array(6 * 5).keys());
    initGame();
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0 && !checkWin(origBoard, player1) && !checkWin(origBoard, player2)) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
		
        return true;
    }
	
    return false;
}

function checkGameOver() {
    if (checkWin(origBoard, player2)) {
        declareWinner(`O`);
    } else if (checkTie()) {
		
        declareWinner(`It's a Draw!`);
    }
    currentPlayer = player1;
}

function updateScore(player) {
    if (player === player1) {
        player1Wins++;
    } else if (player === player2) {
        player2Wins++;
    } else if (player == 'draw') {  //modified added else if with function instead of just being else if (player === draws) ---> player1 || player2
        draws++;
    }
    updateScoreboard();
}

function updateScoreboard() {
    scoreboard.innerHTML = `(X)     Player 1: ${player1Wins} | (O)     Player 2: ${player2Wins} | Draws: ${draws}`;
}

//script for audio playing on loop in the background --> add a button with functions to mute or unmute the background music
//not yet working

/* let myAudio = new Audio();

myAudio.src = '8bitbgm.mp3';

function Gameloop() {
    myAudio.play();
    if (myAudio.paused == true) {
        myAudio.play();
    }
}

myAudio.addEventListener('ended', () => {
    myAudio.play();
}) */