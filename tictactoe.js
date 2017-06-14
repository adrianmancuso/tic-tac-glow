var board = document.getElementsByTagName('main')[0];
var inputOne = document.getElementById('nameP1');
var buttonP1 = document.getElementById('buttonP1');
var inputTwo = document.getElementById('nameP2');
var buttonP2 = document.getElementById('buttonP2');
var currentPlayer = "";


var playerOne = {
	color: '#B26D91'
};

var playerTwo = {
	color: '#14B8CC'
};

//player set up
var playerOneProperties = function() {
	playerOne.name = inputOne.value;
	inputOne.value = "";
	if (playerTwo.name !== undefined) {
		chooseStartingPlayer();
	}
}

var playerTwoProperties = function() {
	playerTwo.name = inputTwo.value;
	inputTwo.value = "";
	if (playerOne.name !== undefined) {
		chooseStartingPlayer();
	}
}

buttonP1.addEventListener('click', playerOneProperties);
buttonP2.addEventListener('click', playerTwoProperties);



var chooseStartingPlayer = function (){
	var x = Math.random();
	if (x >= 0.5) {
		currentPlayer = (playerOne);
	} else {
		currentPlayer = (playerTwo);
	}
}

var takeTurn = function (event, colorInPlay) {
	if (event.target.tagName === 'DIV' && event.target.style.backgroundColor === '') {
		event.target.style.backgroundColor = colorInPlay;
		event.target.classList.add('glowing');
	}
		if (currentPlayer === playerOne) {
			currentPlayer = playerTwo;
		} else {
			currentPlayer = playerOne;
		}
}

var endGameCheck = function() {

}

board.addEventListener('click', function(){takeTurn(event, currentPlayer.color)});