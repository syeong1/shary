const express = require('express'),
    routes = express.Router();
const passport = require('passport');
const movieController = require('../controller/movie-controller');
//Themoviedb Api search movie
routes.get('/search/movie/:title', movieController.getMovieData);
//Themoviedb Api searh Credits
routes.get('/movie/:id', movieController.getCredits);

// 영화 리뷰리스트 가져오기
routes.get('/:id', passport.authenticate('jwt', {
   session: false
}), movieController.getBookReviewList);
// 새 리뷰 등록
routes.post('/write', passport.authenticate('jwt', {
   session: false
}), movieController.writeReview);
//리뷰 디테일 가져오기
routes.get('/detail/:id',movieController.getdetailReview);










module.exports = routes;