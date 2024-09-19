const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  nice: Number,
  talent: Number,
  intelligence: Number,
  experience: Number,
  comment: String,
});

const FounderSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  company: String,
  profilePicture: String,
  ratings: [RatingSchema],
});

module.exports = mongoose.model('Founder', FounderSchema);