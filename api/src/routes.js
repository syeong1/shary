var express = require('express'),
    routes = express.Router();
var userController = require('./controller/user-controller');
var reviewbookController = require('./controller/reviewbook-controller');
var bookController = require('./controller/book-controller');
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


// 리뷰북 리스트 가져오기
routes.get('/reviewbook/:category', passport.authenticate('jwt', {
    session: false
}), reviewbookController.getReviewBookList);



/**
 * 책 book
 */

 
// 네이버 검색 Open API 책
routes.get('/search/book/:title', bookController.getBookData);

// 새 리뷰 등록
routes.post('/review/write', passport.authenticate('jwt', {
    session: false
}), bookController.writeReview);


module.exports = routes;