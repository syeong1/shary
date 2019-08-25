var Book = require('../models/Book');
var request = require('request');
var config = require('../config/config');


// 책 데이터 가져오기
exports.getBookData = (req, res) => {
    console.log(req.params.title);
    var api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(req.params.title); // json 결과
    var options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': config.client_id,
            'X-Naver-Client-Secret': config.client_secret
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

    newReview.save((err, book) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                'msg': err
            });
        }
        console.log(book);
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}


exports.editReview = (req, res) => {

    console.log("@@@ editReview @@@");
    console.log('수정할 review_id : ', req.params.id);
    console.log('수정할 정보: ', req.body);
    console.log("=================================================")
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, book) {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': book
        });
    });
}


// 책 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Book.findByIdAndDelete(review_id, (err, book) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        console.log('삭제완료 book:', book);
        return res.json(book);
    })
}

// 책 리뷰 리스트 가져오기
exports.getBookReviewList = (req, res) => {

    console.log('### 요청한 리뷰리스트 id : ', req.params.id);

    let reviewbook_id = req.params.id;

    Book.find({
        reviewbook: reviewbook_id, // 리뷰북 id로 검색
        writer: req.user._id
    }, function (err, books) {
        console.log(books);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!books) {
            return res.status(404).json({
                error: 'reviewbook not found'
            });
        }
        if (books) {
            return res.status(200).json(books);
        }
    });
}



// 책 리뷰 디테일 가져오기
exports.getBookReviewDetail = (req, res) => {

    console.log('#### 요청한 리뷰 id : ', req.params.id);
    let review_id = req.params.id;

    Book.findOne({
        _id: review_id, // 리뷰 id로 검색
        writer: req.user._id
    }, function (err, book) {
        console.log(book);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!book) {
            return res.status(404).json({
                error: 'book detail not found'
            });
        }
        if (book) {
            return res.status(200).json(book);
        }
    });
}