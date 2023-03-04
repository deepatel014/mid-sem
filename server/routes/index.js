/* 
// File name : OMP229-F2022-MidTerm-301317988/ router/index.js
// Authors Name: Deep Devendra Patel
// Student ID: 301317988
// Web App Name: My Favourite Books
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
