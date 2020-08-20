const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticket.model');
const verify = require('../middleware/auth');

// @route  GET tickets/:projectId
// @desc   Get tickets of the project.
// @access Public 
router.get('/:projectId', (req, res) => {
  Ticket.find({ project: req.params.projectId })
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST tickets/create
// @desc   Create a new ticket of the project.
// @access Private @todo: add valification of jwt. 
router.post('/create', async (req, res) => {
  const { project, issueType, status, summary, description, assignee, reporter, comments } = req.body;

  //Create a new ticket
  const newTicket = new Ticket({
    project: project,
    issueType: issueType,
    status: status,
    summary: summary,
    description: description,
    assignee: assignee,
    reporter: reporter,
    comments: comments,
  });

  try {
    await newTicket.save();
    res.json('Created a new ticket !')
  } catch (err) {
    res.status(400).send(err);
  }

});

module.exports = router;