const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// GET register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    // Validation
    if (!username || !email || !password || !passwordConfirm) {
      req.flash('error', 'Please provide all required fields');
      return res.render('register', { message: 'Please provide all required fields' });
    }

    if (password !== passwordConfirm) {
      req.flash('error', 'Passwords do not match');
      return res.render('register', { message: 'Passwords do not match' });
    }

    // Check if user already exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      req.flash('error', 'Email or username already in use');
      return res.render('register', { message: 'Email or username already in use' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    req.flash('success', 'User registered successfully');
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred during registration');
    res.render('register', { message: 'An error occurred' });
  }
});

// GET login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// POST login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// GET logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    req.flash('success', 'You have been logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;
