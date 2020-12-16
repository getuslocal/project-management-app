const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true, // Uncomment this for demo purpose.
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  pictureUrl: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  orgId: {
    type: Schema.Types.ObjectId,
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;