const express = require('express');
const router = express.Router();
const assert = require('assert');
const mongoose = require('mongoose');
const Twitter = require('../npm/twitter');
const Tweet = require('../models/tweet');
const Tag = require('../models/tag');

mongoose.Promise = global.Promise;
const mongoURL = 'mongodb://admin:password1@ds135233.mlab.com:35233/tweet_bomb';

mongoose.connect(mongoURL);


Tag.collection.drop();
Twitter.aus_tags(function(trends){ console.log("Got All Tags"); });


router.get('/stream/:tag', function(req, res, next){
	console.log(req.params.tag);
	Twitter.stream(req.params.tag);
});

router.get('/alltags', function(req, res, next){

	Tag.find({}, function(err, data){
		if (err){ console.log(err); res.status(500).send; }
		else {
			if (data.length == 0){
				res.status(404).send;
			} else {
				let response = data;
				res.send(response);
			}
		}
	});
});

module.exports = router;
