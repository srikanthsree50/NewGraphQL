const express = require('express');
const { check,body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user')
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
body('email')
.isEmail()
.withMessage('please enter a valid email address....')
.normalizeEmail(),
body('password','must enter a valid password...')
.isLength({min:5})
.isAlphanumeric()
.trim()
], authController.postLogin);

router.post('/signup',[
    check('email')
    .isEmail()
    .withMessage('please enter a valid email address..')
    .custom((value,{req}) => {
        // if(value === 'test@test.com'){
        //     throw new Error('this is forbidden error...')
        // }
        // return true;


       return User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
              return Promise.reject('E-Mail exists already, please pick a different one.');
          }

    })
})
.normalizeEmail(),
    body('password','please enter a password with numbers and characters with minimum 5 characters...')
    .isLength({min:5})
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .trim()
    .custom((value,{req})=>{
if(value !== req.body.password){
    throw new Error('password does not match...');
}
return true;
    })
], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset',authController.getReset);

router.post('/reset',authController.postReset); 

router.get('/reset/:token',authController.getChangePassword); 

router.post('/changePassword',authController.postChangePassword); 


module.exports = router;