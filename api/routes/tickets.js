const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticket.model');
const verify = require('../middleware/auth');

// @route  GET tickets/:projectId
// @desc   Get tickets of the project.
// @access Public 
router.get('/:projectId', (req, res) => {
  Ticket.find({ projectId: req.params.projectId })
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST tickets/create
// @desc   Create a new ticket of the project.
// @access Private @todo: add valification of jwt. 
router.post('/create', async (req, res) => {
  const { projectId, issueType, issuePriority, summary, description, assigneeId, reporterId } = req.body;

  //Create a new ticket
  const newTicket = new Ticket({
    projectId: projectId,
    issueType: issueType,
    issuePriority: issuePriority,
    summary: summary,
    description: description,
    assigneeId: assigneeId,
    reporterId: reporterId,
    comments: [],
  });

  try {
    const savedNewTicket = await newTicket.save();
    res.json(savedNewTicket)
  } catch (err) {
    res.status(400).send(err);
  }

});

// @route  DELETE tickets/:ticketId/
// @desc   Delete a ticket of the id
// @access Public
router.delete('/:ticketId', (req, res) => {
  Ticket.findByIdAndDelete(req.params.ticketId)
    .then(() => res.json('Ticket deleted !'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;