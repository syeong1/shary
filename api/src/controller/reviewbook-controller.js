var Reviewbook = require('../models/reviewbook');


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
