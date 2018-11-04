let mongoose = require('mongoose');

let tag_schema = new mongoose.Schema({
	tag: String,
	amount_of_tweets: Number,
});

let Tag = mongoose.model('Tag', tag_schema);

module.exports = Tag;