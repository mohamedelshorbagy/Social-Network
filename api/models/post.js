const mongoose = require('mongoose');

const LikeSchema = require('./like');

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    likes: LikeSchema
})



const PostModel = mongoose.model('Post', PostSchema);