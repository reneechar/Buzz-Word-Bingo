const express = require('express');
const router = express.Router();

let buzzWordsArr = [];
let score = 0;

function createNewBuzzObj(buzzWord,points) {
	let newBuzzWordTemplate = {
		buzzWord,
		points,
		heard: false
	}
	return newBuzzWordTemplate;
}

function doesNotExist(arr, word) {
	if (arr.length > 0) {
		return arr.every(arr => {
			return arr.buzzWord !== word;
		});	
	} else {
		return true;
	}
}

function removeBuzzObj(word) {
	return buzzWordsArr.filter(buzzObjs => {
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


router.get('/buzzwords', (req,res) => {
	res.json({
		"buzzWords" : buzzWordsArr.map(buzzObjs => {
			return buzzObjs.buzzWord
		})
	})
})

router.post('/buzzword', (req,res) => {

	if (doesNotExist(buzzWordsArr,req.body.buzzWord)) {
		buzzWordsArr.push(createNewBuzzObj(req.body.buzzWord,req.body.points));
		res.json({
			success: true
		})		
	} else {
		res.json({
			success: false,
		})
	}
	
})

router.put('/buzzword', (req,res) => {
	if(doesNotExist(buzzWordsArr,req.body.buzzWord)) {
		res.json({
			success: false
		})
	} else {
		heard(req.body.buzzWord);
		res.json({
			success: true,
			newScore: score
		})
	}
})

router.delete('/buzzword', (req,res) => {
	if(doesNotExist(buzzWordsArr,req.body.buzzWord)) {
		res.json({
			success: false
		})
	} else {
		buzzWordsArr = removeBuzzObj(req.body.buzzWord);
		res.json({
			success: true,
		})
	}
})

router.post('/reset', (req,res) => {
	if(req.body.reset) {
		score = 0;
		buzzWordsArr = [];
		res.json({
			"success": true
		})
	} else {
		res.json({
			"success": false
		})
	}
})

module.exports = router;