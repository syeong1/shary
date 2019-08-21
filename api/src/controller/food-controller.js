const Food = require('../models/food');
//맛집 새 리뷰 추가
exports.writeFoodReview = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({'msg': 'No request'});
    }

    let writer = req.user._id;
    let reviewList = req.paramsreviewbook_id;
    let tag = (req.body.tags).split(',');
    
    
    let newFoodReview = Food(req.body);
    newFoodReview.tag = tag;
    newFoodReview.writer = writer;
    newFoodReview.reviewList = reviewList;

    newFoodReview.save((err, review) => {
        if(err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json(review);
    })
}