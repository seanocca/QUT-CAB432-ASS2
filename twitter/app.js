/* TWITTER RETRIEVE POSTS TO PUT IN MONGO DATABASE */

const Twitter = require('twitter');
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { SentimentAnalyzer } = require('node-nlp');

const sentiment = new SentimentAnalyzer({ language: 'en' });

const client = new Twitter({
  consumer_key: 'dS2YjXih3nwNwGY7GyTmH1PSj',
  consumer_secret: '3OqQsJrT6kJf4MKDRVvBGetuU3aUVUXbEXV7z0mDQOavv8VEvr',
  access_token_key: '1049153965961560067-dpvGNKvWoBVtFZVT3Q6eXXpM1SqVDY',
  access_token_secret: 'QOKQvOfTRiGbvJ0n3HmPio9vCieDRXr9WH7gyaRFXxXIZ'
});

const default_track = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';

const mongoURL = 'mongodb://admin:password1@ds135233.mlab.com:35233/tweet_bomb';

let tweet_schema = new mongoose.Schema({
	tag: String,
  	text: String,
  	sentiment_value: Number,
});

let Tweet = mongoose.model('Tweet', tweet_schema);

let tag_schema = new mongoose.Schema({
  	tag: String,
});

let Tag = mongoose.model('Tag', tag_schema);

mongoose.connect(mongoURL, function(error) {

	Tag.collection.drop();
	Tweet.collection.drop();

	//Get Current Tags
	client.get('trends/place', { id: '23424748' }, function(error, tweets, res, callback){
		if (!error){
			for (trend_group in tweets){
				for (trend in tweets[trend_group].trends){
					console.log(tweets[trend_group].trends[trend]);
					let new_tag = new Tag({
						tag: tweets[trend_group].trends[trend].name,
					});

					new_tag.save();
					console.log("Tag Saved!");
					if (trend == trend){

					}
				}
			}
		}
	});

	// You can also get the stream in a callback if you prefer.
	client.stream('statuses/filter', {track: default_track }, function(stream) {
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
				let sentiment_amount = sentiment.getSentiment(tweet_text);

				let enter_tweet = new Tweet({
					text: tweet_text,
					sentiment_value: sentiment_amount.score
				});

				enter_tweet.save();
				console.log("Tweet Saved to Database!");

			}
		});

		stream.on('error', function(error) {
			throw error;
		});
	});
});