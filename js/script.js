const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const playerName = document.querySelector('.playerName');
const playerForm = document.getElementById('playerForm');
const submitBtn = document.getElementById('myButton');
const gameBoard = document.querySelector('.gameBoard');

submitBtn.addEventListener('click', () => {
	playerName.innerText = document.getElementById('myText').value;
	playerForm.style.display = 'none';
	gameBoard.style.display = 'block';
	playGame();
});

const arrSelection = [
	{ name: 'rock', emoji: '🗿', beats: 'scissors' },
	{ name: 'paper', emoji: '📃', beats: 'rock' },
	{ name: 'scissors', emoji: '✂️', beats: 'paper' },
];

let score = 0;

console.log('selectionButtons', selectionButtons);

function playGame() {
	selectionButtons.forEach((selectionButton) => {
		selectionButton.addEventListener('click', (e) => {
			const selectionName = selectionButton.dataset.selection;

			console.log('selectionButton', selectionButton);

			console.log('selectionName', selectionName);
			const selection = arrSelection.find(
				(selection) => selection.name === selectionName
			);
			makeSelection(selection);
		});
	});
}

function makeSelection(selection) {
	const computerSelection = randomSelection();
	const yourWinner = isWinner(selection, computerSelection);
	const computerWinner = isWinner(computerSelection, selection);

	addSelectionResult(computerSelection, computerWinner);
	addSelectionResult(selection, yourWinner);

	if (yourWinner) incrementScore(yourScoreSpan);
	if (computerWinner) incrementScore(computerScoreSpan);
}

function incrementScore(scoreSpan) {
	scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
	score++;
}

function addSelectionResult(selection, winner) {
	const div = document.createElement('div');
	div.innerText = selection.emoji;
	div.classList.add('result-selection');
	if (winner) div.classList.add('winner');
	finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
	return selection.beats === opponentSelection.name;
}

function randomSelection() {
	const randomIndex = Math.floor(Math.random() * arrSelection.length);
	return arrSelection[randomIndex];
}

let player;
let computer;
let result;

function gameOver() {
	if (player == computer) {
		return 'Draw!';
	} else if (computer == 'Rock') {
		return player == 'Paper' ? 'You Win!' : 'You Lose!';
	} else if (computer == 'Paper') {
		return player == 'Scissors' ? 'You Win!' : 'You Lose!';
	} else if (computer == 'Scissors') {
		return player == 'Rock' ? 'You Win!' : 'You Lose!';
	}
}
