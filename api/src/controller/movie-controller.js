var Movie = require('../models/movie');
var Reviewbook = require('../models/reviewbook');
var config = require('../config/config')
var request = require("request");




//영화 리뷰리스트 가져오기
exports.getBookReviewList = (req, res) => {

    console.log(req);
    console.log('요청한 리뷰리스트 id', req.params._id);
    // let reviewbook_id = req.params.id;
    // 책 리뷰북 가져오기
    let reviewbook_id = req.params.id;
    Movie.find({ reviewbook: reviewbook_id }, (err, reviews) => {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!reviews) {
            return res.status(404).json({
                error: 'reviewMovie not found'
            });
        }
        if (reviews) {
            return res.status(200).json(reviews);
        }
    });
}

// 영화 리뷰 작성
exports.writeReview = (req, res) => {
    let newReview = Movie(req.body);
    let writer = req.user._id;
    newReview.writer = writer;

    newReview.save((err, result) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }
        console.log(result);
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}
exports.getdetailReview = (req, res) => {
    let review_id = req.params.id;
    Movie.findById(review_id, (err, review) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!review) {
            return res.status(404).json({
                error: 'reviewMovie not found'
            });
        }
        if (review) {
            return res.status(200).json(review);
        }
    })
}

//리뷰 수정
exports.editReview = (req, res) => {
    console.log(req.body);
    console.log('req.params.id:',req.params.id);
    let writer = req.user._id;
    req.body.writer=writer;

    Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, movie) {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': movie
        });
    });
}


// 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Movie.findByIdAndDelete(review_id, (err, movie) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        console.log('삭제완료 movie:', movie);
        return res.json(movie);
    })
}