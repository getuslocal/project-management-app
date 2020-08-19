const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/project.model');
const verify = require('../middleware/auth');

// @route  GET projects/:ownerId
// @desc   Get projects of the user.
// @access Public 
router.get('/:ownerId', (req, res) => {
  Project.find({ owner: req.params.ownerId })
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST users/login
// @desc   Login user 
// @access Public 
router.post('/create', async (req, res) => {
  const { key, owner, name, linkUrl, members } = req.body;

  //Create a new project
  const newProject = new Project({
    key: key,
    owner: owner,
    name: name,
    members: members,
  });

  try {
    await newProject.save();
    res.json('Created a new project !')
  } catch (err) {
    res.status(400).send(err);
  }

});

module.exports = router;