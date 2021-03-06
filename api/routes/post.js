/**
 * 
 * 
 * Main Modules
 * 
 */

const express = require('express');
const router = express.Router();
const { errorJSON } = require('../controllers/helpers/helpers');
/**
 * 
 * Import Models [Post]
 * 
 */
const Post = require('../models/post');



/**
 * 
 * 
 * @function: Main Function For Likes
 * 
 */

function addLike() {

}

function removeLike() {

}

/**
 * 
 * @method: GET
 * @function: Get All Posts
 * 
 */

router.get('/all', (req, res, next) => {
    Post
        .find({})
        .populate('user', 'name')
        .populate('likes', 'name')
        .exec()
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    sucess: true,
                    count: respond.length,
                    posts: respond
                })
            } else {
                errorJSON('There\'s No Posts Untill Now!', res);
            }
        })
        .catch(err => errorJSON(err, res));

})



/**
 * 
 * @method: GET
 * @function: Get Most Liked Posts 
 * 
 */

router.get('/mostLiked', (req, res, next) => {
    Post
        .aggregate([
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
                    "length": { $size: { "$ifNull": ["$likes", []] } }
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



/**
 * 
 * @method: POST
 * @function: Create Post
 * 
 */

router.post('/create', (req, res, next) => {
    const postObj = {
        user: req.body.user,
        body: req.body.body
    }

    const post = new Post(postObj);

    post
        .save()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    sucess: true,
                    message: 'Post Created Successfully!'
                })
            } else {
                errorJSON('Something Went Wrong!', res);
            }
        })
        .catch(err => errorJSON(err, res));


})




/**
 * 
 * @method: GET
 * @function: Get Posts By User ID
 * 
 */

router.get('/:userId/user', (req, res, next) => {
    const userId = req.params.userId;

    Post
        .find({ user: userId })
        .exec()
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    success: true,
                    count: respond.length,
                    posts: respond
                })
            } else {
                errorJSON('There\'s No Posts For This User Right Now!', res);
            }
        })
        .catch(err => errorJSON(err, res))

})



/**
 * 
 * @method: GET
 * @function: Get Posts By Post ID
 * 
 */

router.get('/:postId', (req, res, next) => {
    const postId = req.params.postId;

    Post
        .findById(postId)
        .exec()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    post: respond
                })
            } else {
                errorJSON('Something Went Wrong', res);

            }
        })
        .catch(err => errorJSON(err, res))

})





/**
 * 
 * @method: PATCH
 * @function: UPDATE LIKE
 * 
 */

router.post('/:postId/doLike', (req, res, next) => {
    const postId = req.params.postId;
    const likes = req.body.likes;
    Post
        .update(
            {
                _id: postId,
                likes: { $ne: likes[0] }
            },
            {
                $push: {
                    likes: likes
                }
            }
        )
        .exec()
        .then(respond => {
            // ADD CASE
            if (respond['nModified'] >= 1) {
                return Post
                    .find({ _id: postId })
                    .limit(1)
                    .exec()
            } else {
                // REMOVE CASE
                return Post
                    .update(
                        {
                            _id: postId,
                            likes: { $in: likes }
                        },
                        {
                            $pull: {
                                likes: likes[0]
                            }
                        },
                        { multi: true }
                    )
                    .exec()
            }
        })
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    success: true,
                    message: 'Post Liked Successfully',
                    likes_count: respond[0].likes.length
                })
            }
            if (respond['nModified'] >= 1) {
                return Post
                    .find({ _id: postId })
                    .limit(1)
                    .exec()
            } else {
                errorJSON('Something Went Wrong!', res);
            }
        })
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    success: true,
                    message: 'Like Removed Successfully',
                    likes_count: respond[0].likes.length
                })
            } else {
                errorJSON('Something Went Wrong!', res);
            }
        })
        .catch(err => errorJSON(err, res));

})


/**
 * 
 * @method: DELETE
 * @function: DELETE Post By Post ID
 * 
 */

router.delete('/:postId', (req, res, next) => {
    const postId = req.params.postId;
    Post
        .remove({ _id: postId })
        .exec()
        .then(respond => {
            if (respond.n >= 1) {
                res.status(200).json({
                    success: true,
                    message: 'Post Deleted Successfully!'
                })
            } else {
                errorJSON('Something Went Wrong', res);
            }
        })
        .catch(err => errorJSON(err, res))


})


module.exports = router;