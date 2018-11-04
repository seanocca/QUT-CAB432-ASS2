let mongoose = require('mongoose');

let tweet_schema = new mongoose.Schema({
	tag: String,
  	text: String,
  	sentiment_value: Number,
});

let Tweet = mongoose.model('Tweet', tweet_schema);

module.exports = Tweet;
