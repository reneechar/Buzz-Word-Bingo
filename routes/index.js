const express = require('express');
const router = express.Router();
const scores = require('./scores.js');


router.get('/buzzwords', (req,res) => {
	let buzzWords = scores.getBuzzWords();
	res.json({buzzWords})
})

router.post('/buzzword', (req,res) => {
	let success = false;
	if (scores.doesNotExist(req.body.buzzWord)) {
		scores.createNewBuzzObj(req.body.buzzWord,req.body.points);
		success = true;	
	} 
	res.json({success})
})

router.put('/buzzword', (req,res) => {
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

router.delete('/buzzword', (req,res) => {
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