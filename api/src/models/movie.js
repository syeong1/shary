var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../models/image');


var MovieReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewbook: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook'
    },
    title: String,
    director: String,
    releaseDate: Date,
    overview: String,
    genre: String,
    watchDate: Date,
    posterPath: String,
    rating: Number,
    famousLine: String,
    review: String,
    tags: {type:[],'default': ''},
    images: [Image.schema],
    viewCnt: Number,   // 조회수
    like: Number,      // 좋아요 
    liker: {           // 좋아요 누른 사람
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('MovieReview', MovieReviewSchema);