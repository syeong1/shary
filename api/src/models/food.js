var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../models/image');

var FoodReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewList: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook'
    },
    name: String,
    eatDate: Date,
    phoneNumber: String,
    roadAddress: String,
    typeOfFood: String,
    review: String,
    foodPicture: [Image.schema],
    tags: String,
    viewCnt: Number,   // 조회수
    like: Number,      // 좋아요 
    liker: {           // 좋아요 누른 사람
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('FoodReview', FoodReviewSchema);