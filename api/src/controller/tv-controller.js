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
    console.log('episodes',req.body.episodes);
    let newReview = Tv(req.body);
    let episodes= [];
    for(let episode of req.body.episodes){
        if(episode.content !=""){
            episodes.push(episode.content);
        }
    };
    newReview.episodes= episodes;
    let writer = req.user._id;
    newReview.writer = writer;

    newReview.save((err, result) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}

// 티비 리뷰리스트 가져오기
exports.getBookReviewList = (req, res) => {
        console.log('요청한 리뷰리스트 id', req.params._id);
        // 책 리뷰북 가져오기
        let reviewbook_id = req.params.id;
            Tv.find({reviewbook: reviewbook_id}, function (err, reviews) {
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
exports.getdetailReview = (req, res) => {
    let review_id = req.params.id;
    Tv.findById(review_id, (err, review) => {
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
    let episodes= [];
    for(let episode of req.body.episodes){
        if(episode.content !=""){
            episodes.push(episode.content);
        }
    };
    req.body.episodes=episodes;

    Tv.findByIdAndUpdate(req.params.id, {
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
    Tv.findByIdAndDelete(review_id, (err, movie) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        console.log('삭제완료 movie:', movie);
        return res.json(movie);
    })
}
