var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var userController = require('./../controller/user-controller');


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

module.exports = routes;