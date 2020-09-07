const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    trim: true,
  },
  issueType: {
    type: String,
    required: true,
    trim: true,
  },
  issuePriority: {
    type: String,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  assigneeId: {
    type: String,
    trim: true,
  },
  reporterId: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      pictureUrl: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
}, {
  timestamps: true,
  minimize: false
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
