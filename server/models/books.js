/* 
// File name : OMP229-F2022-MidTerm-301317988/ books.js
// Authors Name: Deep Devendra Patel
// Student ID: 301317988
// Web App Name: Book List App
*/
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String,
    Published: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
