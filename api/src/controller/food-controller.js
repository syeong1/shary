const Food = require('../models/food');

var food = {
    writeFoodReview: (req, res) => {
        if (!req.body.name) {
            return res.status(400).json({'msg': 'No request'});
        }
    
        let writer = req.user._id;
        let tag = (req.body.tags).split(',');
        let newFoodReview = Food(req.body);
        console.log(req.body.reviewbook);
        newFoodReview.tag = tag;
        newFoodReview.writer = writer;
    
        newFoodReview.save((err, review) => {
            if(err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(review);
        })

    },

    getFoodReviewList: (req, res) => {
        console.log('reviewlist에 받아온 reviewbook id : ' + req.params.id);
        if(!req.params.id){
            return res.status(400).json({'msg': '리스트 아이디가 없습니다.'});
        }
        let reviewbook_id = req.params.id;
        Food.find({reviewList: reviewbook_id}, (err, result) => {
            if(!result){
                return res.status(404).json({'msg': '등록 리뷰를 찾을 수 없습니다.'})
            }
            if (result) {
                return res.status(200).json(result);
            }
        })

        
    },

    getFoodReviewDetail: (req, res) => {
        if(!req.params.id){
            return res.status(400).json({'msg': '리스트 아이디가 없습니다.'});
        }
        let review_id = req.params.id;
        Food.findOne({ _id: review_id}, (err, result) => {
            if(!result){
                return res.status(404).json({'msg': '등록 리뷰를 찾을 수 없습니다.'})
            }
            if (result) {
                return res.status(200).json(result);
            }
        })
    }
    

}

module.exports = food;