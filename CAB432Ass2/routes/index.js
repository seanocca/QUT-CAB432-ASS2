let express = require('express');
let router = express.Router();
let twitter = require('./twitter.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	twitter.aus_search(function(trends){
		twitter.search(trends, 5, function(tweets){
			res.render('index', { trends: trends, tweets: tweets});
		});
	});
});

module.exports = router;
