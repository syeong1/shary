var express = require('express'),
    routes = express.Router();
var passport = require('passport');



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



/**
 * 책 book
 */


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

routes.post('/review/food/write', passport.authenticate('jwt', {
    session: false
}), food.writeFoodReview);
//리뷰 리스트 불러오기
routes.get('/review/food/:id', passport.authenticate('jwt', {
    session: false
}), food.getFoodReviewList);
//리뷰 디테일 가져오기
routes.get('/review/food/detail/:id', food.getFoodReviewDetail);




/**
 * 지도 API
 */

//장소 검색
routes.get('/map', map.getMap);


module.exports = routes;