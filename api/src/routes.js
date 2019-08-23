var express = require('express'),
    routes = express.Router();
var userController = require('./controller/user-controller');
var reviewbookController = require('./controller/reviewbook-controller');
var bookController = require('./controller/book-controller');
var movieController = require('./controller/movie-controller')
var food = require('./controller/food-controller')
var passport = require('passport');
var map = require('./controller/map-controller');

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});


/**
 * User
 */


// 회원가입 
routes.post('/register', userController.registerUser);

//로그인
routes.post('/login', userController.loginUser);

// 마이페이지 회원정보 가져오기
routes.get('/mypage', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json(req.user);
});

// 마이페이지 회원정보 수정
routes.post('/mypage', passport.authenticate('jwt', {
    session: false
}), userController.updateUser);

routes.get('/special', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        msg: `${req.user._id}`
    });
});



/**
 * 리뷰북 리스트 
 */


// 리뷰북 리스트 가져오기
routes.get('/reviewbook/:category', passport.authenticate('jwt', {
    session: false
}), reviewbookController.getReviewBookList);


// 리뷰북 리스트 생성
routes.post('/reviewbook/write', passport.authenticate('jwt', {
     session: false
     }), reviewbookController.writeReviewBook);



/**
 * 책 book
 */

 
// 네이버 검색 Open API 책
routes.get('/search/book/:title', bookController.getBookData);

// 새 리뷰 등록
routes.post('/review/write', passport.authenticate('jwt', {
    session: false
}), bookController.writeReview);

// 책 리뷰리스트 가져오기
routes.get('/review/book/:id', passport.authenticate('jwt', {
    session: false
}), bookController.getBookReviewList);




/**
 * 맛집 food
 */


//새 맛집 리뷰 등록
routes.post('/review/food/write', passport.authenticate('jwt', {
    session: false
}), food.writeFoodReview);
//리뷰 리스트 불러오기
routes.get('/review/food/:id', passport.authenticate('jwt', {
    session: false
}), food.getFoodReviewList);

 routes.post('/review/food/write', passport.authenticate('jwt', { session: false }), food.writeFoodReview);
//리뷰 리스트 불러오기
routes.get('/review/food/:id', passport.authenticate('jwt', { session: false }), food.getFoodReviewList);
//리뷰 디테일 가져오기
routes.get('/review/food/detail/:id', food.getFoodReviewDetail);

/**
 * 영화 movie
 */
// 영화 리뷰리스트 가져오기
routes.get('/review/movie/:id', passport.authenticate('jwt', {
    session: false
}), movieController.getBookReviewList);
// 새 리뷰 등록
routes.post('/review/movie/write', passport.authenticate('jwt', {
    session: false
}), movieController.writeReview);
//리뷰 디테일 가져오기
routes.get('/review/movie/detail/:id',movieController.getdetailReview);



/**
 * 지도 API
 */

//장소 검색
routes.get('/map', map.getMap);


module.exports = routes;
