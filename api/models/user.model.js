const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    picture: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;