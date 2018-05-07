const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    title: {
        type: String,
        required: true
    }
});


const GroupModel = mongoose.model('Group', GroupSchema);



module.exports = GroupModel;


