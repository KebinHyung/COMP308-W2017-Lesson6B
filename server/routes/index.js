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

module.exports = router;
