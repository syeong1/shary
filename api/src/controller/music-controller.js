var Music = require('../models/music');

// 새 리뷰 작성
exports.writeReview = (req, res) => {

    let newReview = Music(req.body);
    let writer = req.user._id;
    newReview.writer = writer;

    newReview.save((err, music) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                'msg': err
            });
        }
        console.log(music);
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}


// 리뷰 수정
exports.editReview = (req, res) => {

    console.log("@@@ editReview @@@");
    console.log('수정할 review_id : ', req.params.id);
    console.log('수정할 정보: ', req.body);
    console.log("=================================================")
    Music.findByIdAndUpdate(req.params.id, {
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


// 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Music.findByIdAndDelete(review_id, (err, music) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        console.log('삭제완료 book:', music);
        return res.json(music);
    })
}

// 리뷰 리스트 가져오기
exports.getReviewList = (req, res) => {

    console.log('### 요청한 리뷰리스트 id : ', req.params.id);

    let reviewbook_id = req.params.id;

    Music.find({
        reviewbook: reviewbook_id, // 리뷰북 id로 검색
        writer: req.user._id
    }, function (err, musics) {
        console.log(musics);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!musics) {
            return res.status(404).json({
                error: 'reviewbook not found'
            });
        }
        if (musics) {
            return res.status(200).json(musics);
        }
    });
}



// 리뷰 디테일 가져오기
exports.getReviewDetail = (req, res) => {

    console.log('#### 요청한 리뷰 id : ', req.params.id);
    let review_id = req.params.id;

    Music.findOne({
        _id: review_id, // 리뷰 id로 검색
        writer: req.user._id
    }, function (err, music) {
        console.log(music);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!music) {
            return res.status(404).json({
                error: 'music detail not found'
            });
        }
        if (music) {
            return res.status(200).json(music);
        }
    });
}