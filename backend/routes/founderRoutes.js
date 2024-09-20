// backend/routes/founderRoutes.js

// Get Founder by Identifier
router.get('/:identifier', async (req, res) => {
    try {
      const identifier = decodeURIComponent(req.params.identifier);
      let query = {};
  
      if (identifier.startsWith('linkedin:')) {
        query = { linkedin: identifier.split('linkedin:')[1] };
      } else if (identifier.startsWith('twitter:')) {
        query = { twitter: identifier.split('twitter:')[1] };
      } else {
        query = { name: identifier };
      }
  
      let founder = await Founder.findOne(query);
      if (founder) {
        res.json(founder);
      } else {
        // Founder not found, create new founder with available identifier
        founder = new Founder(query);
        await founder.save();
        res.json(founder);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update Founder Details
  router.post('/update', async (req, res) => {
    const { identifier, name, company } = req.body;
    try {
      let query = {};
      if (identifier.startsWith('linkedin:')) {
        query = { linkedin: identifier.split('linkedin:')[1] };
      } else if (identifier.startsWith('twitter:')) {
        query = { twitter: identifier.split('twitter:')[1] };
      } else {
        query = { name: identifier };
      }
  
      let founder = await Founder.findOne(query);
      if (founder) {
        founder.name = name || founder.name;
        founder.company = company || founder.company;
        await founder.save();
        res.json(founder);
      } else {
        res.status(404).json({ message: 'Founder not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });