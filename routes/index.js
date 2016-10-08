const express = require('express');
const router = express.Router();

const buzzWordsArr = [];

function createNewBuzzObj(buzzWord,points) {
	let newBuzzWordTemplate = {
		buzzWord,
		points,
		heard: false
	}
	buzzWordsArr.push(newBuzzWordTemplate);
}


router.get('/buzzwords', (req,res) => {
	res.json({
		"buzzWords" : buzzWordsArr.map(buzzObjs => {
			return buzzObjs.buzzWord
		})
	})
})

router.post('/buzzword', (req,res) => {
	let isNew;

	if (buzzWordsArr.length > 0) {
		isNew = buzzWordsArr.every(buzzObjs => {
			return buzzObjs.buzzWord !== req.body.buzzWord 
		})
	} else {
		isNew = true;
	}

	if (isNew) {
		createNewBuzzObj(req.body.buzzWord,req.body.points);
		res.json({
			success: true
		})		
	} else {
		res.json({
			success: false,
		})
	}
	
})


module.exports = router;