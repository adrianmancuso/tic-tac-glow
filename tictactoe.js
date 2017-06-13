var board = document.getElementsByTagName('main')[0];
var playerOneName = document.getElementById('nameP1');
var playerTwoName = document.getElementById('nameP2');
var startingPlayer = "";
var secondaryPlayer = "";

var chooseStartingPlayer = function (){
	var x = Math.random();
	if (x >= 0.5) {
		startingPlayer = (playerOneName.value);
		secondaryPlayer = (playerTwoName.value);
	} else {
		startingPlayer = (playerTwoName.value);
		secondaryPlayer = (playerOneName.value);
	}
}

var changeColorX = function (event) {
	if (event.target.style.backgroundColor = 'slategrey') {
	event.target.style.backgroundColor = '#B26D91';
	event.target.classList.add('glowing');
	//code to change turn B26D91 B2698B
}
}

var changeColorY = function (event) {
	event.target.style.backgroundColor = '#14B8CC';
	event.target.classList.add('glowing');
}

board.addEventListener('click', changeColorY);