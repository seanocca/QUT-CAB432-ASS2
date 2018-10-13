const { SentimentAnalyzer } = require('node-nlp');

const sentiment = new SentimentAnalyzer({ language: 'en' });

module.exports = {
	get_sentiment: function(text){
		return sentiment.getSentiment(text);
	}
}