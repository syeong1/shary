var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var searchController = require('../controller/search-controller');

// 카테고리별리뷰 검색
routes.get('/book/:term', searchController.getSearchBookReview);
routes.get('/food/:term', searchController.getSearchFoodReview);
routes.get('/movie/:term', searchController.getSearchMovieReview);
routes.get('/music/:term', searchController.getSearchMusicReview);
routes.get('/tv/:term', searchController.getSearchTvReview);


module.exports = routes;