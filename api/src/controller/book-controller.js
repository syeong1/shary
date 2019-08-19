var Book = require('../models/Book');
var request = require('request');

var client_id = '4BAZEL9fhMV7MnBiJx1T';
var client_secret = 'BWYeR798st';


// 책 데이터 가져오기
exports.getBookData = (req, res) => {
    console.log(req.params.title);
    var api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(req.params.title); // json 결과
    var options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).send(body);
        } else {
            res.status(response).end();
            console.log('error = ' + response.statusCode);
        }
    });
}


// 책 리뷰 작성
exports.writeReview = (req, res) => {
    let newReview = Book(req.body);
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