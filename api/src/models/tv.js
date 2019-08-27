var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../models/image');

var TvReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewbook: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook',
        required: true
    },
    title: String,
    broadcaster: String,
    releaseDate: Date,
    overview: String,
    genre: String,
    watchstartDate: Date,
    watchendDate: Date,
    posterPath: String,
    rating: Number,
    state: String,
    review: String,
    episodes:[],
    tags: {type:[],'default': ''},
    images: [Image.schema],
    viewCnt: Number,   // 조회수
    like: Number,      // 좋아요 
    liker: {           // 좋아요 누른 사람
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('TvReview', TvReviewSchema);