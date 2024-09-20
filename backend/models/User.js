// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  twitterId: { type: String, unique: true },
  username: String,
  displayName: String,
  photos: [String],
});

module.exports = mongoose.model('User', UserSchema);