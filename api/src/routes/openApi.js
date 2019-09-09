var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var searchController = require('../controller/openApi-controller');

// 네이버 검색 Open API 책
routes.get('/book/:term', searchController.getBookData);

// itunes 노래 검색
routes.get('/music/:term', searchController.getMusicData);

module.exports = routes;