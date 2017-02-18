//modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


//define user model
let UserModel = require('../models/users');
let User = UserModel.User; //alias for User Model - User Object

//define Game Model
let game = require('../models/games');

//create a function to check if user is authenticated
function requireAuth(req, res, next)
{
  //check if user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    games: ''
   });
});





/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: ''
   });
});

//GET /login - renders login view
router.get("/login" , (req,res, next) => {
  //check to see if user is not already logged in
  if(!req.user) {
    //render/draw login page
    res.render('auth/login', {
      title: "Login",
      games: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName: ''
    });
    //TODO
    return;
  } else{
    return res.redirect('/games'); // redirects to games list
    }
});

//POST /login - process the login view
router.post("/login" , passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login',
  failureFlash: "Incorrect Username/Password"

}));

//GET /register  - renders the register view
router.get("/register" , (req,res, next) => {
if(!req.user) {
    //render the register page
    res.render('auth/register', {
      title: "Register",
      games: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    });
    //TODO
    return;
  } else{
    return res.redirect('/games'); // redirects to games list
    }
});

//POST /register - process the login view
router.post("/register" , (req,res, next) => {
  User.register(
    new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
      }),
      req.body.password,
      (err) => {
        if(err){
          console.log('Error inserting new user');
          if(err.name == "UserExistsError") {
            req.flash('registerMessage', "Registration Error: User Already Exists");
          }
          return res.render('auth/register', {
          title: "Register",
          games: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName: ''
          });
        }
          //if Registration is successful
          return passport.authenticate('local')(req,res,() => {
            res.redirect('/games');
          });
      });
});

//GET /logout - process the logout view
router.get("/logout" , (req,res, next) => {
  req.logOut();
  res.redirect('/'); //redirect to home page
});

module.exports = router;
