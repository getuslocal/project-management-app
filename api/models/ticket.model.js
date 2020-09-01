const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    projectId: {
        type: String,
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
    comments: {
        type: Array,
    },
}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
