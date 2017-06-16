"use strict";
var board = document.getElementsByTagName('main')[0];
var allTiles = document.querySelectorAll('.tile');
var startMenu = document.getElementsByTagName('section')[0];
var inputOne = document.getElementById('nameP1');
var playButton = document.getElementById('playButton');
var inputTwo = document.getElementById('nameP2');
var heading = document.getElementsByTagName('h1')[0];
var playAgain = document.getElementsByClassName('inline')[1];
var newPlayers = document.getElementsByClassName('inline')[2];
var soundOne = new Audio('sounds/bubble1.mp3');
var soundTwo = new Audio('sounds/bubble2.mp3');
var tally = document.querySelectorAll('.tally');
var colorOne = document.getElementsByTagName('select')[0];
var colorTwo = document.getElementsByTagName('select')[1];
var resumeButton = document.getElementById('resumeGame');


var currentPlayer = "";
var filledBoxes = 0;
var winStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var gameOver = false;

var checkGameProgress = function (){
	if (localStorage.gameInProgress == 'true') {
		resumeButton.classList.remove('hide');
		playButton.classList.add('inline');
	} else {
		console.log('the game is finished');
	}
};

checkGameProgress();

var intialGameState = function () {
	localStorage.setItem('playerOneName', playerOne.name);
	localStorage.setItem('playerOneColor', playerOne.color);
	localStorage.setItem('playerTwoName', playerTwo.name);
	localStorage.setItem('playerTwoColor', playerTwo.color);
}

var saveBoardState = function() {
	localStorage.setItem('playerOneBoard', playerOne.boardPositions);
	localStorage.setItem('playerTwoBoard', playerTwo.boardPositions);
}

var playerOne = {
	name: 'player one',
	color: '#B26D91',
	sound: soundOne,
	boardPositions: [],
	winTally: 0,
	scoreBoard: tally[0]
};

var playerTwo = {
	name: 'player two',
	color: '#14B8CC',
	sound: soundTwo,
	boardPositions: [],
	winTally: 0,
	scoreBoard: tally[1]
};



var getProperties = function() {
	playerOne.name = inputOne.value;
	playerOne.color = colorOne.options[colorOne.selectedIndex].value;
	inputOne.value = "";
	if (playerOne.name === ""){
		playerOne.name = "Player One";
	}
	playerTwo.name = inputTwo.value;
	playerTwo.color = colorTwo.options[colorTwo.selectedIndex].value;
	if (playerOne.color === playerTwo.color) {
		playerTwo.color = "#14B8CC";
	}
	inputTwo.value = "";
	if (playerTwo.name === ""){
		playerTwo.name = "Player Two";
	}
	playerOne.scoreBoard.style.color = playerOne.color;
	playerTwo.scoreBoard.style.color = playerTwo.color;
	chooseStartingPlayer();
};

var initializeBoard = function() {
	startMenu.classList.add('hide');
	playButton.classList.add('hide');
	resumeButton.classList.add('hide');
	document.getElementsByTagName('h3')[0].classList.add('hide');
	board.classList.remove('hide');
	localStorage.setItem('gameInProgress', 'true');
	intialGameState();
	heading.innerText = (currentPlayer.name + "'s turn");
}

var resumeBoard = function() {
	resumeButton.classList.add('hide');
	restartBoard();
	currentPlayer = playerOne;

	playerOne.name = localStorage.playerOneName;
	playerOne.color = localStorage.playerOneColor;
	playerOne.boardPositions = localStorage.playerOneBoard.split(',');

	for (var i = 0; i <playerOne.boardPositions.length; i ++){
		var boardPosition = playerOne.boardPositions[i];
		allTiles[boardPosition].style.backgroundColor = playerOne.color;
		allTiles[boardPosition].classList.add('glowing');
	};

	playerTwo.name = localStorage.playerTwoName;
	playerTwo.color = localStorage.playerTwoColor;
	playerTwo.boardPositions = localStorage.playerTwoBoard.split(',');

	for (var i = 0; i <playerTwo.boardPositions.length; i ++){
		var boardPosition = playerTwo.boardPositions[i];
		allTiles[boardPosition].classList.add('glowing');
		allTiles[boardPosition].style.backgroundColor = playerTwo.color;
	};
	filledBoxes = Number(localStorage.filledBoxes);
}



var chooseStartingPlayer = function (){
	var x = Math.random();
	if (x >= 0.5) {
		currentPlayer = (playerOne);
	} else {
		currentPlayer = (playerTwo);
	}
	initializeBoard();
};

var restartBoard = function () {
	playerOne.boardPositions = [];
	playerTwo.boardPositions = [];
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
};

var playSound = function(source) {
	source.play();
};

var takeTurn = function (event, colorInPlay, sound) {
	if (event.target.tagName === 'DIV' && event.target.style.backgroundColor === '') {
		event.target.style.backgroundColor = colorInPlay;
		playSound(sound);
		event.target.classList.add('glowing');
		currentPlayer.boardPositions.push(Number(event.target.id));
		if (currentPlayer === playerOne) {
			localStorage.setItem('playerOneBoard', playerOne.boardPositions);
		} else {
			localStorage.setItem('playerTwoBoard', playerTwo.boardPositions);
		}
		filledBoxes ++;
		localStorage.setItem('filledBoxes', filledBoxes);
		endGameCheck();
		
		if (gameOver) {
			board.classList.add('hide');
			heading.classList.add('end');
			playAgain.classList.remove('hide');
			newPlayers.classList.remove('hide');
			localStorage.setItem('gameInProgress', 'false');
			checkGameProgress();
			return;
		}
		
		if (currentPlayer === playerOne) {
			currentPlayer = playerTwo;
		} else {
			currentPlayer = playerOne;
		}
		heading.innerText = (currentPlayer.name + "'s turn");
	}
};

var endGameCheck = function() {
	if (currentPlayer.boardPositions.length > 2) {
		for (var i = 0; i < winStates.length; i++){
			var matchCount = 0;
			for (var j = 0; j < currentPlayer.boardPositions.length; j++) {
				if (winStates[i].includes(Number(currentPlayer.boardPositions[j]))) {
					matchCount++;
					if (matchCount === 3) {
						heading.style.color = currentPlayer.color;
						heading.innerText = (currentPlayer.name + " wins!");
						currentPlayer.winTally ++;
						localStorage.setItem(currentPlayer.name, currentPlayer.winTally);
						currentPlayer.scoreBoard.innerText = (currentPlayer.name + ": " + currentPlayer.winTally);
						gameOver = true;
						return;
					}
				}
			}
		}
	}

	if (filledBoxes === 9) {
		heading.innerText = "Draw :(";
		gameOver = true;
	}
};

var disableColor = function (event, targetMenu) {
		var x = event.target.options.selectedIndex;
		targetMenu.options[x].disabled = true;
};

var reload = function() {
	location.reload();
};



playButton.addEventListener('click', getProperties);
inputOne.addEventListener('keydown', function(event){ if (event.code === "Enter"){getProperties();}});
inputTwo.addEventListener('keydown', function(event){ if (event.code === "Enter"){getProperties();}});


colorOne.addEventListener('click', function(event){disableColor(event, colorTwo);});
colorTwo.addEventListener('click', function(event){disableColor(event, colorOne);});
board.addEventListener('click', function(event){takeTurn(event, currentPlayer.color, currentPlayer.sound);});
playAgain.addEventListener('click', restartBoard);
resumeButton.addEventListener('click', resumeBoard);
newPlayers.addEventListener('click', reload);
