const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../npm/data');
const Tweet = require('../models/tweet');
const Tag = require('../models/tag');

mongoose.Promise = global.Promise;
const mongoURL = 'mongodb://admin:password1@ds135233.mlab.com:35233/tweet_bomb';

mongoose.connect(mongoURL);

/* GET home page. */
router.get('/', async function(req, res, next) {
	data.get_tags(function(trends){
		res.render('index', {trends : trends});
	});
});

router.post('/', function(req, res, next){
	let search_terms = JSON.stringify(req.body.value);

	search_terms = search_terms.replace(/#/g,"");

	search_terms = JSON.parse(search_terms);

	let tweets = []

	for (let term in search_terms){
		data.start_stream(search_terms[term]);
		data.find_tweet(search_terms[term], function(tweet){
			tweets.push(tweet);
			res.render('errors', {tweets: tweets});
		});
	}
});

module.exports = router;