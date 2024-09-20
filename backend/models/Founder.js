// backend/models/Founder.js

const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  nice: Number,
  talent: Number,
  intelligence: Number,
  experience: Number,
  comment: String,
});

const FounderSchema = new mongoose.Schema({
  name: String,
  company: String,
  profilePicture: String,
  ratings: [RatingSchema],
  linkedin: { type: String, unique: true, sparse: true },
  twitter: { type: String, unique: true, sparse: true },
});

module.exports = mongoose.model('Founder', FounderSchema);