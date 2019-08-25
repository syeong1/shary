var Tv = require('../models/tv');
var config = require('../config/config')
var request = require("request");

exports.getTvData = (req, res) => {

    console.log(req.params.title)


    var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/tv',
        qs:
        {
            language: 'ko-kr',
            api_key: config.apikey,
            query: req.params.title
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        return res.status(200).send(body);
    });

}
exports.writeReview = (req, res) => {
    let newReview = Tv(req.body);
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

// 책 리뷰리스트 가져오기
exports.getBookReviewList = (req, res) => {
    
    console.log(req);
        console.log('요청한 리뷰리스트 id', req.params._id);
        // let reviewbook_id = req.params.id;
        // 책 리뷰북 가져오기
        let reviewbook_id = req.params.id;
            Tv.find({reviewList: reviewbook_id}, function (err, reviews) {
            console.log(reviews);
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (!reviews) {
                return res.status(404).json({
                    error: 'reviewbook not found'
                });
            }
            if (reviews) {
                return res.status(200).json(reviews);
            }
        });
}
