var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var reviewbookController = require('./../controller/reviewbook-controller');


// 카테고리 전체 리뷰북 가져오기
routes.get('/reviewbook/:category', passport.authenticate('jwt', {
    session: false
}), reviewbookController.getReviewbookList);


// 새 리뷰북 생성
routes.post('/reviewbook', passport.authenticate('jwt', {
    session: false
}), reviewbookController.writeReviewbook);


// 리뷰북 삭제
routes.delete('/reviewbook/:id', passport.authenticate('jwt', {
    session: false
}), reviewbookController.deleteReviewbook);



module.exports = routes;