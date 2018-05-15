/**
 *
 * Main Modules
 *
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// HELPERS
const { errorJSON } = require('../controllers/helpers/helpers');

/**
 *
 * Import Models [User]
 *
 */

const User = require('../models/user');

/**
 * @Method : GET
 * @Funtionality : Get All Users
 *
 */

router.get('/all', (req, res, next) => {
    User
        .find({})
        .exec()
        .then(respond => {
            if (respond.length >= 1) {
                res.status(200).json({
                    success: true,
                    count: respond.length,
                    users: respond
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: 'There\'s No Users Untill Now!'
                })
            }
        })
        .catch(err => errorJSON(err, res))
})


/**
 *
 * @Method: GET
 * @Functionality : Get User By ID
 *
 */

router.post('/create', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(respond => {
            if (respond.length >= 1) {
                errorJSON('Email is already Taken! Try Again!', res)
            } else {
                // Encrypting Password
                const encryptedPassword = bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        errorJSON(err, res);
                    }
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });

                    user
                        .save()
                        .then(result => {
                            if (result) {
                                res.status(200).json({
                                    success: true,
                                    message: 'User Created Successfully',
                                    _id: user._id
                                })
                            }
                        })
                        .catch(saveError => {
                            errorJSON(saveError, res);
                        })
                })
            }
        })
        .catch(err => {
            errorJSON(err, res);
        })
});

/**
 *
 * @Method: POST
 * @Functionality : Login User
 *
 */


router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email: email })
        .exec()
        .then(respond => {
            if (respond.length <= 0) {
                errorJSON('User not Found', res);
            } else {
                bcrypt.compare(password, respond[0].password, (error, result) => {
                    if (error) {
                        errorJSON('Email or Password is not correct', res);
                    }

                    if (result === true) {
                        res.status(200).json({
                            success: true,
                            message: 'You are Logged In Successfully',
                            user: respond[0]
                        });
                    } else {
                        errorJSON('Email or Password is not correct', res);
                    }
                })
            }
        })
        .catch(err => {
            errorJSON(err, res);
        })

})






/**
 *
 * @Method: GET
 * @Functionality : Get User By ID
 *
 */

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User
        .findById(id)
        .exec()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    user: respond
                });
            } else {
                errorJSON('Something Went Wrong!', res);
            }
        })
        .catch(err => errorJSON(err, res));



})



/**
 *
 * @Method: PATCH
 * @Functionality : Update User Data
 *
 */

router.patch('/:id/edit', (req, res, next) => {
    const UpdatedObject = {};

    for (let key in req.body) {
        if (req.body[key] !== '') {
            UpdatedObject[key] = UpdatedObject;
        }
    }


    User
        .update({ _id: req.params.id }, { $set: UpdatedObject })
        .exec()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    message: 'Your Profile Updated Successfully!'
                })
            } else {
                errorJSON('Something went wrong!', res);
            }
        })
        .catch(err => errorJSON(err, res));



})

/**
 * 
 * @Method: POST
 * @Functionality: Add Follower To User Followers Array
 * 
 */

router.post('/addFollower', (req, res, next) => {
    const currentUser = req.body.user;
    const followerUser = req.body.following;

    const addCurrentUserFollowers = User
        .update({
            _id: currentUser,
            following: { "$ne": followerUser }
        }, {
                $push: {
                    following: followerUser
                }
            })
        .exec();
    const addFollowerUserFollowing = User
        .update({
            _id: followerUser,
            followers: { "$ne": currentUser }
        }, {
                $push: {
                    followers: currentUser
                }
            })
        .exec();

    Promise.all([addCurrentUserFollowers, addFollowerUserFollowing])
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    sucess: true,
                    message: 'You Follow this user successfully!'
                })
            } else {
                errorJSON('Something Went Wrong', res);
            }
        })
        .catch(err => errorJSON(err, res));
})


/**
 * 
 * @Method: POST
 * @Functionality: UnFollow
 * 
 */

router.post('/unfollow', (req, res, next) => {
    const currentUser = req.body.user;
    const followerUser = req.body.following;

    const removeCurrentUserFollowers = User
        .update({ _id: currentUser }, {
            $pull: {
                following: followerUser
            }
        }, {
                multi: true
            })
        .exec();
    const removeFollowerUserFollowing = User
        .update({ _id: followerUser }, {
            $pull: {
                followers: currentUser
            }
        }, {
                multi: true
            })
        .exec();

    Promise.all([removeCurrentUserFollowers, removeFollowerUserFollowing])
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    sucess: true,
                    message: 'You Unfollow this user successfully!'
                })
            } else {
                errorJSON('Something Went Wrong', res);
            }
        })
        .catch(err => errorJSON(err, res));
})


/**
 * 
 *
 * @Method: DELETE
 * @Functionality : Delete User
 *
 */

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    User
        .remove({ _id: id })
        .exec()
        .then(respond => {
            if (respond.n >= 1) {
                res.status(200).json({
                    success: true,
                    message: 'User Deleted Successfully!'
                })
            } else {
                errorJSON('Something Went Wrong', res);
            }
        })
        .catch(err => errorJSON(err, res));

})

















module.exports = router;
