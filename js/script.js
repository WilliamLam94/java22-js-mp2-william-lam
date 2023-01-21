const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');

const arrSelection = [
	{ name: 'rock', emoji: '🗿', beats: 'scissors' },
	{ name: 'paper', emoji: '📃', beats: 'rock' },
	{ name: 'scissors', emoji: '✂️', beats: 'paper' },
];

let score = 0;

console.log('selectionButtons', selectionButtons);

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
	if (score === 3) {
		isWinner;
	}
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
