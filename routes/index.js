const express = require('express');
const router = express.Router();
const scores = require('../scores.js');


router.get('/buzzwords', (req,res) => {
	let buzzWords = scores.getBuzzWords();
	res.json({buzzWords})
})

router.route('/buzzword')
	.post((req,res) => {
		let success = false;
		
		//if the word is not already in the list and the list is still less than the max length of 5, add new word in to list
		if (scores.doesNotExist(req.body.buzzWord) && scores.getBuzzWords().length < 5) {
			scores.createNewBuzzObj(req.body.buzzWord,req.body.points);
			success = true;	
		} 
		res.json({success})
	})
	.put((req,res) => {
		let success = false;

		if(scores.doesNotExist(req.body.buzzWord)) {
			res.json({success})
		} else {
			scores.heard(req.body.buzzWord);
			success = true;
			res.json({
				success,
				newScore: scores.getScore()
			})
		}
	})
	.delete((req,res) => {
		let success = false;

		if(!scores.doesNotExist(req.body.buzzWord)) {
			scores.removeBuzzObj(req.body.buzzWord);
			success = true;
		}
		res.json({success})
	})

router.post('/reset', (req,res) => {
	let success = false;
	if(req.body.reset) {
		scores.resetGame();
		success = true;	
	} 
	res.json({success})
})

module.exports = router;