const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  key: {
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
    default: {
      'column-1': {
        id: 'column-1',
        title: 'TO DO',
        isDoneColumn: false,
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'IN PROGRESS',
        isDoneColumn: false,
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'IN REVIEW',
        isDoneColumn: false,
        taskIds: [],
      },
      'column-4': {
        id: 'column-4',
        title: 'DONE',
        isDoneColumn: true,
        taskIds: [],
      },
    }
  },
  columnOrder: {
    type: Array,
    required: true,
    default: ['column-1', 'column-2', 'column-3', 'column-4']
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
      ticket: {
        id: {
          type: String,
          required: true
        },
        displayValue: {
          type: String,
          required: true
        },
        type: {
          type: String,
          required: true
        },
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
