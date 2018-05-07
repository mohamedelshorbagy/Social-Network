const mongoose = require('mongoose');

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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
})



const PostModel = mongoose.model('Post', PostSchema);


module.exports = PostModel;