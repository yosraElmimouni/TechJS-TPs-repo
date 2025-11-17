const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
require('dotenv').config();

const User = require('./models/User');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Flash messages
app.use(flash());

// Passport configuration
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return done(null, false, { message: 'Email not found' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    
    if (!isPasswordMatch) {
      return done(null, false, { message: 'Password is incorrect' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Local variables middleware
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.user;
  next();
});

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/books');
  } else {
    res.redirect('/auth/login');
  }
});

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error',
    error: err.message 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
