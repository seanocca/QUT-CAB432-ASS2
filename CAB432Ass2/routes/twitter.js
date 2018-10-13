let twitternpm = require('twitter');
let natural = require('./natural');

const client = new twitternpm({
  consumer_key: 'dS2YjXih3nwNwGY7GyTmH1PSj',
  consumer_secret: '3OqQsJrT6kJf4MKDRVvBGetuU3aUVUXbEXV7z0mDQOavv8VEvr',
  access_token_key: '1049153965961560067-dpvGNKvWoBVtFZVT3Q6eXXpM1SqVDY',
  access_token_secret: 'QOKQvOfTRiGbvJ0n3HmPio9vCieDRXr9WH7gyaRFXxXIZ'
});

module.exports = {

	get: function(){
		client.get('statuses/home_timeline', function(error, tweets, res) {
		  	if (!error) {
		  		let ans = tweets;
		  		console.log(ans.text);
		  		return tweets;
		  }
		});
	},

	search: function(search_term, term_id, callback){
		client.get('search/tweets', { langauge: 'en', q: search_term[term_id].name }, function(error, tweets, res){
			if (!error) {
				let searched_tweets = [];
				for (tweet in tweets.statuses){
					let curr_tweet = tweets.statuses[tweet];
					if (curr_tweet != null ){
						let sentiment = natural.get_sentiment(curr_tweet.text);
						searched_tweets.push(curr_tweet);
						searched_tweets[tweet].sentiment_value = sentiment.score;
						searched_tweets[tweet].tag = search_term;
					}
				}
		  		callback(searched_tweets);
		  	}
		});
	},

	aus_search: function(callback){
		client.get('trends/place', { id: '23424748' }, function(error, tweets, res){
			if (!error){
				let trends = [];
				for (trend_group in tweets){
					for (trend in tweets[trend_group].trends){
						trends.push(tweets[trend_group].trends[trend]);
					}
				}
				callback(trends);
			}
		});
	},

	stream: function(){
		client.stream('statuses/filter', {track: 'JSON',  language: 'en'}, function(stream) {
		  stream.on('data', function(event) {
		    console.log(event && event.text);
		    return event.text
		  });
		  stream.on('error', function(error) {
		    throw error;
		  });
		});
	},

	tweet: function(){
		return "Outside of file";
	}
}