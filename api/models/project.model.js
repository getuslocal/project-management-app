const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  orgId: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: Array,
    required: true,
    minlength: 1
  },
  columns: {
    type: Object,
    required: true,
  },
  columnOrder: {
    type: Array,
    required: true,
  },
  projectIconUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  history: [
    {
      ticketId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      editor: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: function () {
          if (this.field === null) return false
          return true
        }
      },
      before: {
        type: String,
        required: function () {
          if (this.before === null) return false
          return true
        }
      },
      after: {
        type: String,
        required: function () {
          if (this.after === null) return false
          return true
        }
      },
      date: {
        type: Date,
        default: Date.now,
        required: true
      }
    }
  ],
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
