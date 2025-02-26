const express = require('express');
const {check, validationResult} = require('express-validator');
const { RegisterUser, getUsers, loginUser, updateUser, deleteUser,userDetails } = require('../controllers/user.controller');
const Auth = require('../middlewares/AuthMiddlewares')


const router = express.Router();

// resgister a user
router.post(
    '/register',
    [
        check('firstName', 'firstName is required').not().isEmpty(),
        check('lastName', 'lastName is required').not().isEmpty(),
        check('email', 'Please include a valid mail').isEmail(),
        check('password', "Password must be atleast 6 characters").isLength({min:6})
    ],
    RegisterUser
);

// login user

router.post(
    '/login',
    [
        check('email', 'Please include a valid mail').isEmail(),
        check('password', "Password must be atleast 6 characters").isLength({min:6})
    ],
    loginUser
)

// get user
router.get('/getusers', Auth, getUsers)


// update user
router.put('/updateuser', Auth, updateUser)

// delete user
router.delete('/deleteuser', Auth, deleteUser)

router.post('/userdetails', Auth, userDetails);



module.exports = router;