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
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
