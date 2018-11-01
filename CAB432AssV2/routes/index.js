const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../npm/data')

const mongoURL = 'mongodb://admin:password1@ds135233.mlab.com:35233/tweet_bomb';

/* GET home page. */
router.get('/', async function(req, res, next) {
	data.get_tags(function(trends){
		res.render('index', {trends : trends});
	});
});

router.get('/search', function(req, res, next){
	let search_terms = req.query.value;

	let search_tags = [];
	for (let term in search_terms){
		search_tags.push(search_terms[term]);
		data.stream(JSON.stringify(search_terms[term]));
	}
	data.get_tags(function(trends){
		// Get all information from the database when it arrives to the database
		// res.write(JSON.stringify(search_tags.search_tags));
	});
});

module.exports = router;
