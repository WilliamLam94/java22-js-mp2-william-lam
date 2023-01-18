const selectionButtons = document.querySelectorAll('[data-seletion]');

const arrSelection = [
	{ name: 'rock', emoji: '🗿', beats: 'scissors' },
	{ name: 'paper', emoji: '📃', beats: 'rock' },
	{ name: 'scissors', emoji: '✂️', beats: 'paper' },
];

selectionButtons.forEach((selectionButton) => {
	selectionButton.addEventListener('click', (e) => {
		const selectionName = selectionButton.dataset.selection;
		arrSelection.find((selection) => selection.name === selectionName);
		makeSelection(selectionName);
	});
});

function makeSelection(selection) {
	const computerSelection = randomSelection();
	const yourWinner = isWinner(selection, computerSelection);
	const computerWinner = isWinner(computerSelection, selection);

	addSelectionResult(computerSelection, computerWinner);
	addSelectionResult(selection, yourWinner);
}

function addSelectionResult(selection, winner) {}

function isWinner(selection, opponentSelection) {
	return selection.beats === opponentSelection.name;
}

function randomSelection() {
	const randomIndex = Math.floor(Math.random() * arrSelection.length);
	return arrSelection[randomIndex];
}
