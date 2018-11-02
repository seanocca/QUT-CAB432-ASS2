const twitternpm = require('twitter');
const natural = require('./natural');
const Tweet = require('../models/tweet');
const Tag = require('../models/tag');

const client = new twitternpm({
  consumer_key: 'dS2YjXih3nwNwGY7GyTmH1PSj',
  consumer_secret: '3OqQsJrT6kJf4MKDRVvBGetuU3aUVUXbEXV7z0mDQOavv8VEvr',
  access_token_key: '1049153965961560067-dpvGNKvWoBVtFZVT3Q6eXXpM1SqVDY',
  access_token_secret: 'QOKQvOfTRiGbvJ0n3HmPio9vCieDRXr9WH7gyaRFXxXIZ'
});

module.exports = {

	aus_tags: function(callback){
		client.get('trends/place', { id: '23424748' }, function(error, tweets, res){
			if (!error){
				let trends = []
				for (trend_group in tweets){
					for (trend in tweets[trend_group].trends){
						trends.push(tweets[trend_group].trends[trend].name);
						let new_tag = new Tag({
							tag: tweets[trend_group].trends[trend].name,
							amount_of_tweets: tweets[trend_group].trends[trend].tweet_volume,
						});
						new_tag.save();
					}
				}
				callback(trends);
			}
		});
	},

	stream: function(tag){
		console.log(tag.size);
		let trends = tag.split(',');
		for (let trend in trends){
			console.log(trends[trend]);
			client.stream('statuses/filter', {track: trends[trend],  language: 'en'}, function(stream) {
				console.log("Stream Started");
			  	stream.on('data', function(tweet) {
					let tweet_text = "";
					if(tweet != undefined) {
						if (tweet.lang === 'en'){
						    if(tweet.extended_tweet){
						      	tweet_text = tweet.extended_tweet.full_text;
						    }else{
						      	if(tweet.retweeted_status) {
						        	tweet_text = tweet.retweeted_status.text;
						      	} else {
						        	tweet_text = tweet.text;
						      	}
						    }
						}
					}
					if (tweet_text != ""){
						let sentiment_amount = natural.get_sentiment(tweet_text);

						let enter_tweet = new Tweet({
							tag: trends[trend],
							text: tweet_text,
							sentiment_value: sentiment_amount.score
						});

						enter_tweet.save();
					}
				});

				stream.on('error', function(error) {
					stream.destroy();
				});
			});
		}
	}
}