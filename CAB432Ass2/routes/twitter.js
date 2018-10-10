let twitternpm = require('twitter');

const client = new twitternpm({
  consumer_key: 'dS2YjXih3nwNwGY7GyTmH1PSj',
  consumer_secret: '3OqQsJrT6kJf4MKDRVvBGetuU3aUVUXbEXV7z0mDQOavv8VEvr',
  access_token_key: '1049153965961560067-dpvGNKvWoBVtFZVT3Q6eXXpM1SqVDY',
  access_token_secret: 'QOKQvOfTRiGbvJ0n3HmPio9vCieDRXr9WH7gyaRFXxXIZ'
});

module.exports = {

	get: function(){
		client.get('statuses/home_timeline',"country_code"="AUS", function(error, tweets, response) {
		  	if (!error) {
		  		console.log(tweets);
		  		return tweets;
		  }
		});
	},

	tweet: function(){
		return "Outside of file";
	}
}