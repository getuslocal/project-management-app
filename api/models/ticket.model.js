const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    project: {
        type: String,
        required: true,
        trim: true,
    },
    issueType: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
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
    assignee: {
        type: String,
        required: true,
        trim: true,
    },
    reporter: {
        type: String,
        required: true,
        trim: true,
    },
    comments: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
