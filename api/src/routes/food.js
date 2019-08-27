var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var foodController = require('./../controller/food-controller');
var map = require('../controller/map-controller');



//새 맛집 리뷰 등록
routes.post('/review/food/write', passport.authenticate('jwt', {
    session: false
}), foodController.writeFoodReview);
//리뷰 리스트 불러오기
routes.get('/review/food/:id', passport.authenticate('jwt', {
    session: false
}), foodController.getFoodReviewList);

routes.post('/review/food/write', passport.authenticate('jwt', {
    session: false
}), foodController.writeFoodReview);
//리뷰 리스트 불러오기
routes.get('/review/food/:id', passport.authenticate('jwt', {
    session: false
}), foodController.getFoodReviewList);
//리뷰 디테일 가져오기
routes.get('/review/food/detail/:id', foodController.getFoodReviewDetail);




/**
 * 지도 API
 */

//장소 검색
routes.get('/map', map.getMap);

module.exports = routes;