const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  key: {
    type: Number,
    required: true,
    default: 0
  },
  issueType: {
    type: String,
    required: true,
    trim: true,
  },
  issuePriority: {
    type: String,
    required: true,
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
        type: Schema.Types.ObjectId,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  linkedEpic: {
    type: Schema.Types.ObjectId
  },
  issueColor: {
    type: String,
  },
  dateRange: {
    type: Object
  },
  dueDate: {
    type: Date,
  },
  columnId: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
  minimize: false
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
