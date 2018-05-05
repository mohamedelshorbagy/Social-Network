/**
 * 
 * Main Modules
 * 
 */

const express = require('express');
const router = express.Router();





/**
 * @Method : GET
 * @Funtionality : Get All Users
 * 
 */

router.get('/all', (req, res, next) => {
    // TODO: Get All Users 

    res.status(200).json({
        success: true,
        message: 'Get All Users'
    })
})


/**
 * 
 * @Method: GET
 * @Functionality : Get User By ID
 * 
 */

router.post('/create', (req, res, next) => {
    // TODO: Create User 

    // Bride.find({ email: req.body.email })
    //     .exec()
    //     .then(respond => {
    //         if (respond.length >= 1) {
    //             res.status(409).json({
    //                 success: false,
    //                 error: 'This Email is already taken',
    //             });
    //         } else {
    //             // Encrypting Password
    //             const encryptedPassword = bcrypt.hash(req.body.password, 10, (err, hash) => {
    //                 if (err) {
    //                     res.status(500).json(helpers.errorJSON(err));
    //                 }
    //                 const user = new Bride({
    //                     name: req.body.name,
    //                     email: req.body.email,
    //                     password: hash,
    //                     mobile: req.body.mobile
    //                 });

    //                 user
    //                     .save()
    //                     .then(result => {
    //                         if (result) {
    //                             res.status(200).json({
    //                                 success: true,
    //                                 message: 'Bride Created Successfully',
    //                                 _id: user._id
    //                             })
    //                         }
    //                     })
    //                     .catch(saveError => {
    //                         res.status(500).json(helpers.errorJSON(saveError))
    //                     })
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json(helpers.errorJSON(err))
    //     })
});







/**
 * 
 * @Method: GET
 * @Functionality : Get User By ID
 * 
 */

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // TODO: GET User By ID

    res.status(200).json({
        sucess: true,
        message: `Get User ${id}`
    })
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

    // TODO: Update User Data in Database



})

/**
 * 
 * @Method: DELETE
 * @Functionality : Delete User
 * 
 */

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    // TODO: DELETE User From Database


})

















module.exports = router;