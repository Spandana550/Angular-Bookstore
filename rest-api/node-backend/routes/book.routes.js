const express=require('express');
const app=express();
const bookRoute=express.Router();
let Book=require('../model/Book');

//Add book for store
bookRoute.route('/add-book').post((req,res,next)=>{
    Book.create(req.body)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    next(error);
  });
});

//get all book from store
bookRoute.route('/books-list').get((req,res,next)=>{
  Book.find()
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    next(error);
  });
});

//Get Book by id
bookRoute.route('/read-book/:id').get((req,res)=>{
    Book.findById(req.params.id)
  .then(data => {
    if (data) {
      res.json(data);
    } else {
      // Handle the case when the document is not found
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
  })
  .catch(error => {
    // Handle the error
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  });

});

bookRoute.route('/update-book/:id').put((req,res,next)=>{
    Book.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(data => {
    res.json(data);
    console.log("Book updated successfully");
  })
  .catch(error => {
    next(error);
    console.log(error);
  });
});

//delete a book from bookstore
bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    Book.findByIdAndRemove(req.params.id)
  .then(data => {
    res.status(200).json({
      msg: data
    });
  })
  .catch(error => {
    next(error);
  });
})

module.exports=bookRoute;