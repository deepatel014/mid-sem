/* 
// File name : OMP229-F2022-MidTerm-301317988/ routes/books.js
// Authors Name: Deep Devendra Patel
// Student ID: 301317988
// Web App Name: Book List App
*/



// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { findOneAndDelete } = require('../models/books');

// define the book model
let books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  books.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // rendering the add page 
    res.render('books/add', {title:'Add Book'});


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // taking the values given in the input field from the add page and feeding it to the book object
    let book = books({
      "Title": req.body.Title,
      "Author": req.body.Author,
      "Published":req.body.Published,
      "Description": req.body.Description,
      "Price":req.body.Price,
      "Genre": req.body.Genre
    });

    // adding the book object with the values to the database using the 'create' method  
    books.create(book,(err,book)=>{
      if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books');
        }
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // getting the id of the specific book item and passing it to the details.ejs page which has the edit form
    let id = req.params.id;

    books.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('books/details', {title: 'Edit Book', books: bookToEdit})
        }
    });
});

// POST - process the information passed from the details form and update the document
// using assynch and await for this functionality for error handling and ease of data processing 
router.post('/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    try{
      let id = req.params.id

      // updating the database using the findOneAndUpdate method 
    let updatedBook = await books.findOneAndUpdate({_id: id},{
        // "_id": id,
        Title: req.body.Title,
        Author: req.body.Author,
        Published:req.body.Published,
        Description: req.body.Description,
        Price:req.body.Price,
        Genre: req.body.Genre
    });
    
    console.log(req.body.Title);
    res.redirect('/books');

    }catch(error){
      console.log(error);
    }
   

});

// GET - process the delete by user id
router.get('/delete/:id',async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // using the asynch await to delete the book item 
    let id = req.params.id;

    try{

      // using the findOneAndDelete method over here to delete the item
      const deleted = await books.findOneAndDelete({_id: id});
      res.redirect('/books');
    }catch(error){
      console.log(error);
      res.end(err);
    }


    // books.remove({_id: id}, (err) => {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.end(err);
    //     }
    //     else
    //     {
    //          // refresh the book list
    //          res.redirect('/books');
    //     }
    // });

});


module.exports = router;
