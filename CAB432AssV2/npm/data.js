const request = require('request');

module.exports = {

	get_tags: function(callback){
		request.get({
			"headers": {"content-type": "application/json"},
			"url":'http://localhost:3001/alltags'},
			function(error, res, body){
			if (error) { console.log("no connection"); }
			else {
				callback(JSON.parse(body));
			}
		});
	},

	stream: function(tag, callback){
		request.get({
			"headers": {"content-type": "application/json"},
			"url":'http://localhost:3001/stream/'+ tag},
			function(error, res, body){
				if (error) { console.log("Cannot start Stream!")}
				else { console.log("Stream Started"); }
			});
	}
}