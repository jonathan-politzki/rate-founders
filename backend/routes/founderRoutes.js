const express = require('express');
const router = express.Router();
const Founder = require('../models/Founder');

// Get Founder by Name
router.get('/:name', async (req, res) => {
  try {
    const founder = await Founder.findOne({ name: req.params.name });
    if (founder) {
      res.json(founder);
    } else {
      res.status(404).json({ message: 'Founder not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add or Update Founder Rating
router.post('/rate', async (req, res) => {
  const { name, ratings } = req.body;
  try {
    let founder = await Founder.findOne({ name });
    if (!founder) {
      founder = new Founder({ name, ratings: [ratings] });
    } else {
      founder.ratings.push(ratings);
    }
    await founder.save();
    res.json(founder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;