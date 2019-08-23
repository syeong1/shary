var Movie = require('../models/movie');
var Reviewbook = require('../models/reviewbook');


//영화 리뷰리스트 가져오기
exports.getBookReviewList = (req, res) => {
    
    console.log(req);
        console.log('요청한 리뷰리스트 id', req.params._id);
        // let reviewbook_id = req.params.id;
        // 책 리뷰북 가져오기
        let reviewbook_id = req.params.id;
            Movie.find({reviewList: reviewbook_id},(err, reviews)=> {
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