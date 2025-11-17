const express = require('express');

const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in first');
  res.redirect('/auth/login');
};

// Sample books data
const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    description: 'A classic novel of the Jazz Age'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    description: 'A gripping tale of racial injustice and childhood innocence'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    description: 'A dystopian social science fiction novel'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    description: 'A romantic novel of manners'
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
    description: 'A story of teenage rebellion and alienation'
  }
];

// GET books page (protected)
router.get('/', isAuthenticated, (req, res) => {
  res.render('books', {
    title: 'Books',
    user: req.user,
    books: books
  });
});

module.exports = router;
