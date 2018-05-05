const mongoose = require('mongoose');




const LikeSchema = mongoose.Schema({
    likes: {
        total: {
            type: Number
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})


module.exports  = LikeSchema;