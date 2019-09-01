const express = require('express'),
    routes = express.Router();
const passport = require('passport');
const tvController = require('../controller/tv-controller');

//tv 리뷰리스트 가져오기
routes.get('/:id',passport.authenticate('jwt',{session:false}),tvController.getBookReviewList);
// 새 리뷰 등록
routes.post('/', passport.authenticate('jwt', {
    session: false
 }), tvController.writeReview);
 //리뷰 디테일 가져오기
routes.get('/detail/:id',tvController.getdetailReview);


module.exports = routes;
