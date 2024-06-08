const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')




//  login user view 
router.get('/login', (req,res)=> {
    res.render('user/login', {
        error: req.flash('error')
    })
})



// Sign_up a user in db
// router.post('/singup',
//   passport.authenticate('local.signup', {
//     successRedirect: '/',
//       failureRedirect: '/events/signup',
//       failureFlash: true })
//       )

// login post request 


//logout
router.get('/logout', (req,res)=> {

    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    })
})






// route for sign in
router.get('/signin', (req, res) => {

    res.render('user/signin');
});  

module.exports = router 