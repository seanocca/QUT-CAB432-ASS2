let Analyzer = require('natural').SentimentAnalyzer;
let stemmer = require('natural').PorterStemmer;
let analyzer = new Analyzer("English", stemmer, "afinn")

module.exports = {
	get_sentiment: function(text){
		let sentiment_value = 0;
		sentiment_value = analyzer.getSentiment(text);
		console.log(sentiment_value);
		return sentiment_value;
	}
}