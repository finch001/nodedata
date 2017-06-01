var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {
	request('https://movie.douban.com/top250', function (err, response, body) {
		if (response.statusCode == 200) {
			var $ = cheerio.load(body);
			var navText = $('.grid_view>li');
			var movies = [];
			navText.each(function (i, ele) {
				//获取到对应
				let index = $(this).find('.pic>em').text();
				let title = $(this).find('.title').first().text();
				let img_src = $(this).find('.pic>a>img').attr('src');
				let quote = $(this).find('.inq').text().trim();
				movies[i] = { index: index, title: title, img: img_src, quote: quote };
			});
			console.log(movies);
			res.send(navText.html());
		}
	});
});

module.exports = router;
