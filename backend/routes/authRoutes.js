// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Authenticate with Twitter
router.get('/twitter', passport.authenticate('twitter'));

// Twitter callback URL
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: 'http://localhost:3000/search',
    failureRedirect: 'http://localhost:3000',
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

// Check authentication status
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;