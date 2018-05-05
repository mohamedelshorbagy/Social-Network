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
 * @Method: GET
 * @Functionality: Get All Posts
 * 
 */

router.get('/all', (req, res, next) => {
    //TODO: Get all Posts From Schema

    res.status(200).json({
        sucess: true,
        message: 'Get All Posts'
    })

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
 * @Functionality: Get Post By User ID
 * 
 */

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    //TODO: Get Post By User ID

    res.status(200).json({
        sucess: true,
        message: 'Get Posts By User ID'
    })

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

router.patch('/:postId', (req, res, next) => {
    const postId = req.params.postId;
    //TODO: Update Post By Post ID

    res.status(200).json({
        sucess: true,
        message: 'DELETE Post By Post ID'
    })

})


module.exports = router;