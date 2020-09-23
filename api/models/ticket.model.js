const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  key: {
    type: String,
    trim: true,
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
  linkedEpic: {
    type: Schema.Types.ObjectId
  },
  issueColor: {
    type: String,
  },
  dateRange: {
    type: Object
  },
  isEpicDone: {
    type: Boolean
  },
  count: {
    type: Number,
  },
}, {
  timestamps: true,
  minimize: false
});

ticketSchema.plugin(AutoIncrement, { id: 'count_seq', inc_field: 'count' });
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
