/**
 * 
 * 
 * Main Modules
 * 
 */

const express = require('express');
const router = express.Router();



/**
 * 
 * IMPORT Models
 * 
 */

const Group = require('../models/group');
const Post = require('../models/post');


// IMPORT HELPERS
const { errorJSON } = require('../controllers/helpers/helpers')
/**
 * 
 * @method: GET
 * @function: Get All Groups [ Admin Authorization ]
 * 
 */

router.get('/all', (req, res, next) => {
    Group
        .find({})
        .exec()
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    sucess: true,
                    count: respond.length,
                    groups: respond
                })
            } else {
                res.status(200).json({
                    sucess: false,
                    message: 'There\'s No Groups Right Now!'
                })
            }
        })
        .catch(err => errorJSON(err))
})


/**
 * 
 * 
 * @method: POST
 * @function: Create Group
 * 
 */

router.post('/create', (req, res, next) => {
    const groupData = {
        admin: req.body.admin,
        title: req.body.title
    }


    const group = new Group(groupData);


    group
        .save()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    message: 'Group Created Successfully!'
                });
            } else {
                errorJSON('Something went wrong!', res);
            }
        })
        .catch(err => errorJSON(err, res))

})



/**
 * 
 * @method: GET
 * @function: Get Group By ID
 * 
 */

router.get('/:groupId', (req, res, next) => {
    const groupId = req.params.groupId;
    Group
        .find({ _id: groupId })
        .populate('users', 'name')
        .exec()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    group: respond[0]
                })
            } else {
                res.status(200).json({
                    sucess: false,
                    message: 'There\'s No Group With this ID!'
                })
            }
        })
        .catch(err => errorJSON(err));

})

/**
 * 
 * @method: GET
 * @function: Get All Posts in Groups 
 * 
 */

router.get('/:groupId/posts', (req, res, next) => {
    const groupId = req.params.groupId;
    Post
        .find({ group: groupId })
        .populate('user', 'name')
        .populate('likes', 'name')
        .exec()
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    success: true,
                    count: respond.length,
                    posts: respond
                })
            } else {
                res.status(200).json({
                    sucess: false,
                    message: 'There\'s No Posts In this Group!'
                })
            }
        })
        .catch(err => errorJSON(err));

})


/**
 * 
 * 
 * @method: Add Post To Group
 * @Body:
 *  { 
        user: mongoose.Shema.ObjectID,
        body: String,
        group: mongoose.Shema.ObjectID    
 *  }
 * 
 */

router.post('/addPost', (req, res, next) => {
    const postObj = {
        user: req.body.user,
        body: req.body.body,
        group: req.body.group
    }

    const post = new Post(postObj);

    post
        .save()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    message: 'Post Added To Group Successfully'
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: 'Something Went Wrong!'
                })
            }
        })
        .catch(err => errorJSON(err));
})

/**
 * 
 * 
 * @method: PATCH
 * @Body:
 *  { 
        user: mongoose.Shema.ObjectID,
        group: mongoose.Shema.ObjectID    
 *  }
 * 
 */

router.patch('/addUser', (req, res, next) => {
    const groupId = req.body.group;
    const user = req.body.user;

    Group
        .update(
            { _id: groupId },
            {
                $push: {
                    users: user
                }
            }
        )
        .exec()
        .then(respond => {
            if (respond.n >= 1) {
                res.status(200).json({
                    success: true,
                    message: 'Member Added To Group Successfully!'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Something went wrong!'
                })
            }
        })
        .catch(err => errorJSON(err));

})


/**
 * 
 * 
 * @method: PATCH 
 * @Body:
 *  { 
        user: mongoose.Shema.ObjectID,
        group: mongoose.Shema.ObjectID    
 *  }
 * 
 */



router.delete('/removeUser', (req, res, next) => {
    const groupId = req.body.group;
    const user = req.body.user;

    Group
        .update(
            { _id: groupId },
            {
                $pull: {
                    users: user
                }
            },
            { multi: true }
        )
        .exec()
        .then(respond => {
            if (respond.n >= 1) {
                res.status(200).json({
                    success: true,
                    message: 'Member Added To Group Successfully!'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Something went wrong!'
                })
            }
        })
        .catch(err => errorJSON(err));

})




/**
 * 
 * 
 * @method: GET 
 * @Params: :userId
 * 
 * 
 */

router.get('/:userId/:groupId/insideGroup', (req, res, next) => {
    const user = req.params.userId;
    const groupId = req.params.groupId;
    Group
        .find({ _id: groupId, users: user })
        .exec()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    message: 'This User is Inside this group'
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: 'This User is not Inside this group'
                })
            }
        })
        .catch(err => errorJSON(err));
})


/**
 * 
 * @method: GET
 * @function: Get Most Liked Post in Group
 * 
 * 
 */
router.get('/:groupId/mostLikedPostInGroup', (req, res, next) => {
    Post
        .aggregate([
            {
                $match: { group: req.params.groupId }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    "user._id": 1,
                    "user.name": 1,
                    "likes": 1,
                    "length": { $size: "$likes" }
                }
            },
            { $sort: { "length": -1 } }
        ], (err, result) => {
            if (err) {
                errorJSON('Something Went Wrong!', res);
            }

            let mostLikedPost = result.splice(0, 1)[0];
            res.status(200).json({
                success: true,
                mostLiked: mostLikedPost,
                posts: result
            })
        })
})






module.exports = router;