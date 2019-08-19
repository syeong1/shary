var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewbookSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        default: Date.now
    },
    count: {
        type: Number,
        default: 0
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

module.exports = mongoose.model('Reviewbook', ReviewbookSchema);