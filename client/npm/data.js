const request = require('request');
const Tweet = require('../models/tweet');
const Tag = require('../models/tag');

module.exports = {

	get_tags: function(callback){
		request.get({
			"headers": {"content-type": "application/json"},
			"url":'http://52.65.6.140:8000/alltags'},
			function(error, res, body){
			if (error) { console.log(error); console.log("no connection"); }
			else {
				callback(JSON.parse(body));
			}
		});
	},

	start_stream: function(tag, callback){
		request.get({
			"headers": {"content-type": "application/json"},
			"url":'http://52.65.6.140:8000/stream/'+ tag},
			function(error, res, body){
				if (error) { console.log("Cannot start Stream!"); }
				else { console.log("Stream Started"); }
			});
	},

	find_tweet: function(tag, callback){
		Tweet.find({
			"tag": tag,
		}).stream().on('data', function(tweet){
			console.log(tweet);
			callback(tweet);
		})
	}
}