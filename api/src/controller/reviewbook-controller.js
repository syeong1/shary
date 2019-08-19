var Reviewbook = require('../models/reviewbook');

/**
 * 테스트용 리뷰북 생성 메소드
 */
exports.writeReviewBook = function(req, res) {
    if(!req.body.title){
        return res.status(400).json({'msg': 'No request'});
    }
    
    let newFoodReviewBook = new Reviewbook();
    newFoodReviewBook.title = req.body.title;
    newFoodReviewBook.category = req.body.category;
    newFoodReviewBook.writer = req.user._id;

    newFoodReviewBook.save((err, reviewList) => {
        if(err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json(reviewList);
    })

}


exports.getReviewBookList = (req, res) => {

    console.log('요청한 카테고리', req.params.category);

    // 책 리뷰북 가져오기
    Reviewbook.find({category: req.params.category, writer: req.user._id}, function (err, reviewbooks) {
        console.log(reviewbooks);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!reviewbooks) {
            return res.status(404).json({
                error: 'reviewbook not found'
            });
        }
        if (reviewbooks) {
            return res.status(200).json(reviewbooks);
        }
    });
}
