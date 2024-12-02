const express = require("express");
const app = express();

const bookRoute = express.Router();
let Book = require("../model/Book");

// Get all Books
bookRoute.route("/").get((req, res) => {
  Book.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
    });
});

// Add a book
bookRoute.route("/add-book").post((req, res) => {
  Book.create(req.body)
    .then(() => {
      console.log("Book added successfully.");
      res.status(200);
    })
    .catch((error) => {
      console.error(`Could not save book: ${error}`);
    });
});

// Delete a book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  console.log(`Preparing to delete: ${req.params.id}`);
  Book.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log('Book deleted successfully.');
      res.status(200).send('Book deleted successfully');
    })
    .catch((error) => {
      console.error(`Could not delete book: ${error}`);
      res.status(500).send('Could not delete book');
    });
});


// Update a book
bookRoute.route('/update-book/:id').put((req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBook => {
      res.status(200).json(updatedBook);
    })
    .catch((error) => {
      console.error(`Could not update book: ${error}`);
      res.status(500).send("Error updating book.");
    });
});

// Get book by ID
bookRoute.route('/get-book/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      res.status(200).json(book);
    })
    .catch((error) => {
      console.error(`Could not retrieve book: ${error}`);
      res.status(500).send("Error retrieving book.");
    });
});

module.exports = bookRoute;