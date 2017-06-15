var board = document.getElementsByTagName('main')[0];
var allTiles = document.querySelectorAll('.tile');
var startMenu = document.getElementsByTagName('section')[0];
var inputOne = document.getElementById('nameP1');
var playButton = document.getElementById('playButton');
var inputTwo = document.getElementById('nameP2');
var heading = document.getElementsByTagName('h1')[0];
var playAgain = document.getElementsByClassName('newGame')[0];
var newPlayers = document.getElementsByClassName('newGame')[1];
var soundOne = new Audio('sounds/bubble1.mp3');
var soundTwo = new Audio('sounds/bubble2.mp3');


var playerOne = {
	name: 'player one',
	color: '#B26D91',
	sound: soundOne,
	picks: [],
	winTally: 0
};

var playerTwo = {
	name: 'player two',
	color: '#14B8CC',
	sound: soundTwo,
	picks: [],
	winTally: 0
};

var currentPlayer = "";
var filledBoxes = 0;
var winStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var gameOver = false;

//to do - create colour choices for players
//player set up
var getProperties = function() {
	playerOne.name = inputOne.value;
	inputOne.value = "";
	if (playerOne.name === ""){
		playerOne.name = "Player One";
	}
	playerTwo.name = inputTwo.value;
	inputTwo.value = "";
	if (playerTwo.name === ""){
		playerTwo.name = "Player Two";
	}
	chooseStartingPlayer()
}

playButton.addEventListener('click', getProperties);
inputOne.addEventListener('keydown', function(event){ if (event.code === "Enter"){getProperties();}})
inputTwo.addEventListener('keydown', function(event){ if (event.code === "Enter"){getProperties();}})

var chooseStartingPlayer = function (){
	var x = Math.random();
	if (x >= 0.5) {
		currentPlayer = (playerOne);
	} else {
		currentPlayer = (playerTwo);
	}
		
	startMenu.classList.add('hide');
	playButton.classList.add('hide');
	document.getElementsByTagName('h3')[0].classList.add('hide');
	board.classList.remove('hide');
	heading.innerText = (currentPlayer.name + "'s turn");
}

var restartBoard = function () {
	playerOne.picks = [];
	playerTwo.picks = [];
	gameOver = false;
	filledBoxes = 0;

	allTiles.forEach(function(element){
		element.classList.remove('glowing');
		element.style.backgroundColor = "";
	});

	heading.classList.remove('end');
	playAgain.classList.add('hide');
	newPlayers.classList.add('hide');
	chooseStartingPlayer();
}

var playSound = function(source) {
	source.play();
}

var takeTurn = function (event, colorInPlay, sound) {
	if (event.target.tagName === 'DIV' && event.target.style.backgroundColor === '') {
		event.target.style.backgroundColor = colorInPlay;
		playSound(sound);
		event.target.classList.add('glowing');
		currentPlayer.picks.push(Number(event.target.id));
		filledBoxes ++;
		endGameCheck();
		
		if (gameOver) {
			board.classList.add('hide');
			heading.classList.add('end');
			playAgain.classList.remove('hide');
			newPlayers.classList.remove('hide');
			return
		}
		
		if (currentPlayer === playerOne) {
			currentPlayer = playerTwo;
		} else {
			currentPlayer = playerOne;
		}
		heading.innerText = (currentPlayer.name + "'s turn");
	}
}

var endGameCheck = function() {
	if (currentPlayer.picks.length > 2) {
		for (var i = 0; i < winStates.length; i++){
			var matchCount = 0;
			for (var j = 0; j < currentPlayer.picks.length; j++) {
				if (winStates[i].includes(currentPlayer.picks[j])) {
					matchCount++;
					if (matchCount === 3) {
						heading.innerText = (currentPlayer.name + " wins!");
						gameOver = true;
						return
					}
				}
			}
		}
	}

	if (filledBoxes === 9) {
		heading.innerText = "Draw. Game Over";
		gameOver = true;
	}
}

board.addEventListener('click', function(event){takeTurn(event, currentPlayer.color, currentPlayer.sound)});
playAgain.addEventListener('click', restartBoard);
