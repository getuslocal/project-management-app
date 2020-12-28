import { NextFunction, Request, Response } from 'express';
import Ticket from '../models/ticket';
import Project from '../models/project';

// Get tickets overview collection of the project.
const getTicketsByProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await Ticket.find({ projectId: req.params.project_id });
    res.json(tickets);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

//Create a new ticket of the project.
const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formData = req.body;
    const { projectId } = formData;
    const project = await Project.findById(projectId);

    if (!project) return res.status(400).send('Project not found.');

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
};

// Delete a ticket of the id.
const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
    res.json(ticket);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update an existing ticket of the project.
const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticketId = req.params.id;
  const { field, value } = req.body;

  // Check the requested body's format is valid.
  if (!field) {
    res.status(400).send('Invalid submission');
  }

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId },
      { $set: { [field]: value } },
      { new: true, runValidators: true }
    );
    res.json(updatedTicket);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Comment on a ticket.
const addTicketComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get current user id.
    const { _id: uid } = res.locals.user;
    const ticket = await Ticket.findById(req.params.id);

    const newComment = {
      user: uid,
      text: req.body.text,
    };

    if (!ticket) return res.status(400).send('Ticket not found.');

    ticket.comments.unshift(newComment);

    await ticket.save();

    res.json(ticket.comments);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete comment.
const deleteTicketComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await Ticket.findById(req.params.ticket_id);
    const { _id: uid } = res.locals.user;

    if (!ticket) return res.status(400).send('Ticket not found.');

    // Pull out comment
    const comment = ticket.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== uid) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    ticket.comments = ticket.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await ticket.save();

    res.json(ticket.comments);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default {
  getTicketsByProjectId,
  createTicket,
  deleteTicket,
  updateTicket,
  addTicketComment,
  deleteTicketComment,
};
