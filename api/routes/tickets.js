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
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST tickets/create
// @desc   Create a new ticket of the project.
// @access Private @todo: add valification of jwt. 
router.post('/create', verify, async (req, res) => {
  const { projectId, issueType, issuePriority, summary, description, assigneeId, reporterId, key } = req.body;

  //Create a new ticket
  const newTicket = new Ticket({
    projectId: projectId,
    key: key,
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
router.delete('/:ticketId', verify, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
    res.json(ticket);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST tickets/update
// @desc   Update an existing ticket of the project.
// @access Private
router.post('/update/:ticketId', verify, async (req, res) => {
  const ticketId = req.params.ticketId;
  const { issueType, issuePriority, summary, description, assigneeId, reporterId } = req.body;
  try {
    const updatedData = {
      issueType,
      issuePriority,
      summary,
      description,
      assigneeId,
      reporterId
    };
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId },
      { $set: updatedData },
      { new: true, runValidator: true }
    );
    res.json(updatedTicket)
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;