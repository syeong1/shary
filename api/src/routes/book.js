var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var bookController = require('./../controller/book-controller');


// 네이버 검색 Open API 책
routes.get('/search/book/:title', bookController.getBookData);

// 새 리뷰 등록
routes.post('/review/book', passport.authenticate('jwt', {
    session: false
}), bookController.writeReview);

// 리뷰 수정
routes.patch('/review/book/:id', passport.authenticate('jwt', {
    session: false
}), bookController.editReview);

// 책 리뷰 삭제
routes.delete('/review/book/:id', passport.authenticate('jwt', {
    session: false
}), bookController.deleteReview);

// 책 리뷰 리스트 가져오기
routes.get('/review/book/:id', passport.authenticate('jwt', {
    session: false
}), bookController.getBookReviewList);


// 책 리뷰 디테일 가져오기
routes.get('/review/book/detail/:id', passport.authenticate('jwt', {
    session: false
}), bookController.getBookReviewDetail);





module.exports = routes;