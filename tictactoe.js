var board = document.getElementsByTagName('main')[0];
var startMenu = document.getElementsByTagName('section')[0];
var inputOne = document.getElementById('nameP1');
var playButton = document.getElementById('playButton');
var inputTwo = document.getElementById('nameP2');
var currentPlayer = "";
var heading = document.getElementsByTagName('h1')[0];
var filledBoxes = 0;
var winStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var gameOver = false;

var playerOne = {
	name: 'player one',
	color: '#B26D91',
	picks: []
};

var playerTwo = {
	name: 'player two',
	color: '#14B8CC',
	picks: []
};

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





var chooseStartingPlayer = function (){
	var x = Math.random();
	if (x >= 0.5) {
		currentPlayer = (playerOne);
	} else {
		currentPlayer = (playerTwo);
	}
	startMenu.classList.add('hide');
	playButton.classList.add('hide');
	board.classList.remove('hide');
	heading.innerText = (currentPlayer.name + "'s turn");

}

var takeTurn = function (event, colorInPlay) {
	if (event.target.tagName === 'DIV' && event.target.style.backgroundColor === '') {
		event.target.style.backgroundColor = colorInPlay;
		event.target.classList.add('glowing');
		currentPlayer.picks.push(Number(event.target.id));
		filledBoxes ++;
		checkWin();
		checkEnd;
		if (gameOver) {
			board.classList.add('hide');
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

var checkWin = function() {
	if (currentPlayer.picks.length > 2) {
		for (var i = 0; i < winStates.length; i++){
			var matchCount = 0;
			for (var j = 0; j < currentPlayer.picks.length; j++) {
				if (winStates[i].includes(currentPlayer.picks[j])) {
					matchCount++;
					if (matchCount === 3) {
						heading.innerText = (currentPlayer.name + " wins!");
						gameOver = true;
					}
				}
			}
		}
	}
}

var checkEnd = function () {
	if (filledBoxes === 9) {
		heading.innerText = "Draw. Game Over";
		gameOver = true;
	}
}


board.addEventListener('click', function(){takeTurn(event, currentPlayer.color)});

// win states as  array numbers:
// 012, 345, 678, 036, 147, 258, 048, 246
// lowest number + 2 check, if exists + 2 check

// credit https://johnresig.com/blog/fast-javascript-maxmin/ for min prototype method

