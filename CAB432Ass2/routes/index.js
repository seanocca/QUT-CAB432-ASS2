var express = require('express');
var router = express.Router();
let twitter = require('./twitter.js')

/* GET home page. */
router.get('/', function(req, res, next) {
	let hello = twitter.get();
	console.log(hello);
  	res.render('index', { title: hello });
});

module.exports = router;
