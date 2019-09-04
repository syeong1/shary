var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var searchController = require('../controller/search-controller');

// 네이버 검색 Open API 책
routes.get('/book/:title', searchController.getBookData);

// itunes 노래 검색
routes.get('/music/:title', searchController.getMusicData);

module.exports = routes;