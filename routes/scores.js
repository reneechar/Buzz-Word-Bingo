let buzzWordsArr = [];
let score = 0;

function createNewBuzzObj(buzzWord,points) {
	let newBuzzWordTemplate = {
		buzzWord,
		points,
		heard: false
	}
	buzzWordsArr.push(newBuzzWordTemplate);
}

function doesNotExist(word) {
	if (buzzWordsArr.length > 0) {
		return buzzWordsArr.every(obj => {
			return obj.buzzWord !== word;
		});	
	} else {
		return true;
	}
}

function removeBuzzObj(word) {
	buzzWordsArr = buzzWordsArr.filter(buzzObjs => {
		return buzzObjs.buzzWord !== word;
	});
}

function heard(word) {
	buzzWordsArr = buzzWordsArr.map(buzzObjs => {
		if (buzzObjs.buzzWord === word) {
			score += parseInt(buzzObjs.points);
			buzzObjs.heard = true;
		}
		return buzzObjs;
	})	
}

function getScore() {
	return score;
}

function getBuzzWords() {
	return buzzWordsArr.map(buzzObjs => {
		return buzzObjs.buzzWord
	})
}

function resetGame() {
	score = 0;
	buzzWordsArr = [];
}

module.exports = {
	createNewBuzzObj,
	doesNotExist,
	removeBuzzObj,
	heard,
	getScore,
	getBuzzWords,
	resetGame
}