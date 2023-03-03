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
    res.render('books/add', {title:'Add Book'});


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let book = books({
      "Title": req.body.Title,
      "Author": req.body.Author,
      "Published":req.body.Published,
      "Description": req.body.Description,
      "Price":req.body.Price,
      "Genre": req.body.Genre
    });
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
router.post('/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    try{
      let id = req.params.id

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
    // let id = req.params.id

    // let updatedBook = books({
    //     // "_id": id,
    //     "Title": req.body.Title,
    //     "Author": req.body.Author,
    //     "Published":req.body.Published,
    //     "Description": req.body.Description,
    //     "Price":req.body.Price,
    //     "Genre": req.body.Genre
    // });

    // books.updateOne({_id: id}, updatedBook, (err) => {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.end(err);
    //     }
    //     else
    //     {
    //         // refresh the book list
    //         res.redirect('/books');
    //     }
    // });

});

// GET - process the delete by user id
router.get('/delete/:id',async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    try{
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
