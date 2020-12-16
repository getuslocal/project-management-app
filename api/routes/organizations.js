const router = require('express').Router();
const Organization = require('../models/organization.model');
const verify = require('../middleware/auth');

// @route  GET organizations/:id
// @desc   Get organization by id.
// @access Private 
router.get('/:id', verify, (req, res) => {
  Organization.findById(req.params.id)
    .then(organization => res.json(organization))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST organizations/create
// @desc   Create a new organization.
// @access Private
router.post('/create', verify, async (req, res) => {
  try {
    const { name } = req.body;

    //Create a new organization
    const newOrganization = new Organization({
      name: name,
      projects: [],
    });

    const savedOrg = await newOrganization.save();
    res.json(savedOrg);
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;