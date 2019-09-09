var Book = require('../models/Book');
// var Food = require('../models/Food');
// var Movie = require('../models/Movie');
var Music = require('../models/Music');
var Tv = require('../models/tv');

// 책 카테고리 리뷰 검색 (타이틀, 저자)
exports.getSearchBookReview = (req, res) => {
    console.log('### 카테고리 : ', '책');
    console.log('### 검색어 : ', req.params.term);
    Book.find({
        $or: [{
            "title": {
                $regex: '.*' + req.params.term + '.*'
            }
        }, {
            "author": {
                $regex: '.*' + req.params.term + '.*'
            }
        }]
    }, function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (reviews.length) {
            return res.status(200).json(reviews);

        } else {
            return res.status(404).json({
                msg: '리뷰가 없습니다.'
            });
        }
    });
}

// 맛집 카테고리 리뷰 검색 (타이틀)
exports.getSearchFoodReview = (req, res) => {
    console.log('### 카테고리 : ', '맛집');
    console.log('### 검색어 : ', req.params.term);
    Food.find({
        name: {
            $regex: '.*' + req.params.term + '.*'
        }
    }, function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!reviews) {
            return res.status(404).json({
                error: 'reviews not found'
            });
        }
        if (reviews) {
            return res.status(200).json(reviews);
        }
    });
}



// 영화 카테고리 리뷰 검색 (타이틀)
exports.getSearchMovieReview = (req, res) => {
    console.log('### 카테고리 : ', '영화');
    console.log('### 검색어 : ', req.params.term);
    Movie.find({
        title: {
            $regex: '.*' + req.params.term + '.*'
        }
    }, function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!reviews) {
            return res.status(404).json({
                error: 'reviews not found'
            });
        }
        if (reviews) {
            return res.status(200).json(reviews);
        }
    });
}

// 음악 카테고리 리뷰 검색 (타이틀, 가수이름)
exports.getSearchMusicReview = (req, res) => {
    console.log('### 카테고리 : ', '음악');
    console.log('### 검색어 : ', req.params.term);
    Music.find({
        $or: [{
            "trackName": {
                $regex: '.*' + req.params.term + '.*'
            }
        }, {
            "artistName": {
                $regex: '.*' + req.params.term + '.*'
            }
        }]
    }, function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!reviews) {
            return res.status(404).json({
                error: 'reviews not found'
            });
        }
        if (reviews) {
            return res.status(200).json(reviews);
        }
    });
}

// TV 카테고리 리뷰 검색 (타이틀)
exports.getSearchTvReview = (req, res) => {
    console.log('### 카테고리 : ', '티비');
    console.log('### 검색어 : ', req.params.term);
    Tv.find({
        title: {
            $regex: '.*' + req.params.term + '.*'
        }
    }, function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (reviews.length) {
            return res.status(200).json(reviews);

        } else {
            return res.status(404).json({
                'msg': '리뷰북이 없습니다.'
            });
        }
    });
}