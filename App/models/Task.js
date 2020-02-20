const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task_id : {
        type : String,
        unique : true
    },
    task_level : {
        type : String,
        default : 'low'
    },
    task_name : {
        type: String,
        default : ''
    },
    created : {
        type: Date,
        default: Date.now()
    },
    updated : {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Task', taskSchema)