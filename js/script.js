const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const playerName = document.querySelector('.playerName');
const playerForm = document.getElementById('playerForm');
const submitBtn = document.getElementById('myButton');
const gameBoard = document.querySelector('.gameBoard');
const resultsBoard = document.querySelector('.results');
const gameOverContainer = document.querySelector('.gameOverContainer');
const playAgainBtn = document.querySelector('.playAgainBtn');
const result = document.querySelector('.result');

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
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

function playGame() {
	selectionButtons.forEach((selectionButton) => {
		selectionButton.addEventListener('click', (e) => {
			const selectionName = selectionButton.dataset.selection;

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

	if (yourWinner) {
		incrementScore(yourScoreSpan);
	}
	if (computerWinner) {
		incrementScore(computerScoreSpan);
	}
	if (
		Number(yourScoreSpan.innerText) === 3 ||
		Number(computerScoreSpan.innerText) === 3
	) {
		if (Number(yourScoreSpan.innerText) === 3) {
			const pEl = document.createElement('p');
			pEl.innerText = 'You Win!🤟';
			result.append(pEl);
		}

		if (Number(computerScoreSpan.innerText) === 3) {
			const pEl = document.createElement('p');
			pEl.innerText = 'Computer Wins!🤖';
			result.append(pEl);
		}

		selectionButtons.forEach((selectionButton) => {
			selectionButton.disabled = true;
		});

		gameOverContainer.style.display = 'block';

		playAgainBtn.addEventListener('click', () => {
			playAgain();
		});
	}
}

function playAgain() {
	yourScoreSpan.innerText = 0;
	computerScoreSpan.innerText = 0;
	result.innerHTML = '';

	const answers = document.querySelectorAll('.result-selection');

	console.log('answers.length', answers.length);

	answers.forEach((answer) => {
		answer.parentNode.removeChild(answer);
	});

	selectionButtons.forEach((selectionButton) => {
		selectionButton.disabled = false;
	});

	gameOverContainer.style.display = 'none';
}

function incrementScore(scoreSpan) {
	scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
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
