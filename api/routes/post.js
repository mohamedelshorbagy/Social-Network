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
 * @Method: GET
 * @Functionality: Get All Posts
 * 
 */

router.get('/all', (req, res, next) => {
    Post
        .find({})
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
 * @Method: POST
 * @Functionality: Create Post
 * 
 */

router.get('/create', (req, res, next) => {
    //TODO: Create Post
    res.status(200).json({
        sucess: true,
        message: 'Create Post'
    })

})




/**
 * 
 * @Method: GET
 * @Functionality: Get Posts By User ID
 * 
 */

router.get('/:userId', (req, res, next) => {
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
                errorJSON('There\'s No POsts For This User Right Now!', res);
            }
        })
        .catch(err => errorJSON(err, res))

})



/**
 * 
 * @Method: GET
 * @Functionality: Get Posts By Post ID
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
 * @Method: PATCH
 * @Functionality: UPDATE Post
 * 
 */

router.patch('/:postId/edit', (req, res, next) => {
    const postId = req.params.postId;
    //TODO: Update Post By Post ID

    res.status(200).json({
        sucess: true,
        message: 'Update Post By Post ID'
    })

})






/**
 * 
 * @Method: DELETE
 * @Functionality: DELETE Post By Post ID
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