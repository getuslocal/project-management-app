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
    // linkUrl: { //@todo : enable this and assign the url when new project is created. Use the tourl function.
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    // },
    members: {
        type: Array,
        required: true,
        minlength: 1
    },
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
