const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport-setup');

const app = express();

// Middleware for sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});

// Auth Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, 
res) => {
    res.redirect('/profile');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/redirect', passport.authenticate('facebook'), 
(req, res) => {
    res.redirect('/profile');
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/redirect', passport.authenticate('github'), (req, 
res) => {
    res.redirect('/profile');
});

// Logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

