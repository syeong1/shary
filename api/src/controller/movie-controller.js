var Movie = require('../models/movie');
var Reviewbook = require('../models/reviewbook');
var ObjectId = require('mongodb').ObjectId;


var write = {

    //리뷰 불러오기(reviewlist id 값으로)
    showReview: (req,res)=>{
        let reviewlist_id = req.params.id;
        let o_id = new ObjectId(reviewlist_id);
        Movie.find({ reviewList: o_id }, (err, result) => {
            if(err){
                return res.status(400).json({ 'msg': err });
            }
            if (!result) {
                return res.status(404).json({ 'msg': '등록리뷰를 찾을수 없습니다.' });
            }
            if (result) {
                return res.status(200).json(result);
            }
        })
    },
    //Review 저장
    registerReview: (req,res)=>{
       
        let tags = (req.body.tags).split(',');//tags string 배열로 분리
        req.body.tags = tags;
        let newReview = Movie(req.body);
        newReview.writer = req.user._id;
        newReview.save((err, result) => {
            let review_list = req.body.reviewList_id;
            let set = {'$push': {'reviews': result._id }};
            let option = { 'upsert': true, 'new': true };
            let callback = (err,result)=>{
                if (err) {
                    return res.status(400).json({ 'msg': err });
                };
                if(result){
                    return res.status(200).json({'msg':'정상적으로 저장'})
                }
            };

            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            Reviewbook.findByIdAndUpdate(review_list, set, option,callback)
            return res.status(201).json(result);
        })
        
    },
    //Review 삭제(Review id 값으로)
    deleteReview:(req,res)=>{
        let review_id = req.params.id;
        Review.findByIdAndDelete(review_id, (err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            };
            console.log('삭제완료 res:', result);
            return res.json(result);
        })
    }

}


module.exports = write;