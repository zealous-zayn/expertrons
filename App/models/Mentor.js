const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    mentor_id : {
        type : String,
        unique : true,
    },
    mentor_name : {
        type: String,
        required: true,
        default: ''
    },
    mentor_field : {
        type: String,
        default:''
    },
    assigned_task:[{
        type : Schema.Types.ObjectId, 
        ref : 'Task'
    }],
    created : {
        type: Date,
        default: Date.now()
    },
    updated : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Mentor', mentorSchema)