const router = require('express').Router();
const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const Project = require('../models/project.model');
const verify = require('../middleware/auth');

// @route  GET tickets/:projectId
// @desc   Get tickets overview collection of the project.
// @access Private 
router.get('/:projectId', verify, (req, res) => {
  Ticket.find({ projectId: req.params.projectId })
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST tickets/create
// @desc   Create a new ticket of the project.
// @access Private
router.post('/create', verify, async (req, res) => {
  try {
    const formData = req.body;
    const { projectId } = formData;
    const project = await Project.findById(projectId);
    const updatedSeq = ++project.seq;
    // Update a sequence value of the project.
    project.seq = updatedSeq;
    // Assign a key of the ticket.
    formData.key = updatedSeq;
    //Create a new ticket.
    const newTicket = new Ticket(formData);
    
    // Save on db.
    const savedNewTicket = await newTicket.save();
    await project.save();

    res.json(savedNewTicket);
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
router.post('/update/:id', verify, async (req, res) => {
  const ticketId = req.params.id;
  const { field, value } = req.body;

  // Check the requested body's format is valid.
  if (!field) {
    res.status(400).send("Invalid submission");
  }

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId },
      { $set: { [field]: value } },
      { new: true, runValidator: true }
    );
    res.json(updatedTicket)
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST tickets/comment/:id
// @desc   Comment on a ticket.
// @access Private
router.post('/comment/:id', verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const ticket = await Ticket.findById(req.params.id);

    const newComment = {
      user: user._id,
      text: req.body.text,
      name: user.name,
      pictureUrl: user.pictureUrl,
    };

    ticket.comments.unshift(newComment);

    await ticket.save();

    res.json(ticket.comments);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  DELETE tickets/comment/:id/:comment_id
// @desc   Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', verify, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    // Pull out comment
    const comment = ticket.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    ticket.comments = ticket.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await ticket.save();

    res.json(ticket.comments)
  } catch (err) {
    res.status(400).send(err);
  }
});



module.exports = router;