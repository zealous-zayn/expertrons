const mongoose = require('mongoose');
const shortId = require('shortid');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const time = require('../libs/timeLib');

const MentorModel = mongoose.model('Mentor')
const TaskModel = mongoose.model('Task')

let createMentor = async (req, res)=>{
    try{
    let mentorDetails = await new Promise((resolve, reject)=>{
            let newMentro = new MentorModel({
                mentor_id : shortId.generate(),
                mentor_name : req.body.mentor_name,
                mentor_field : req.body.mentor_field,
                created : time.now()
            })
    
             newMentro.save((err,data)=>{
                 if(err){
                     reject(err)
                 }
                 resolve(data)
             })
        })
        let apiResponse = await response.generate(false, "Mentor Created Successfully", 200, mentorDetails)
            await res.send(apiResponse)
        } catch(err){
            logger.captureError(err.message, 'mentorController: createMentor', 10)
            let apiResponse = response.generate(true, 'Failed To create mentor', 500, null)
            res.send(apiResponse)
        }
}

let getAllMentor = async (req, res)=>{
    try{
        let details = await new Promise((resolve, reject)=>{
             MentorModel.find((err,data)=>{
                 if(err){
                     reject(err)
                 } else {
                     resolve(data)
                 }
             })
        })
        let apiResponse = await response.generate(false, "All mentor details", 200, details)
        await res.send(apiResponse)
    } catch(err){
        logger.captureError(err.message, 'mentorController: getAllMentor', 10)
        let apiResponse = response.generate(true, 'Failed To fetch details', 500, null)
        res.send(apiResponse)
    }
    
}

let getSingleMentor = async (req, res)=>{
    try{
        let details = await new Promise((resolve, reject)=>{
             MentorModel.findOne({mentor_id : req.params.mentor_id})
             .populate('assigned_task')
             .exec((err,data)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        let apiResponse = await response.generate(false, "Mentor details", 200, details)
        await res.send(apiResponse)
    } catch(err){
        logger.captureError(err.message, 'mentorController: getSingleMentor', 10)
        let apiResponse = response.generate(true, 'Failed To fetch details', 500, null)
        res.send(apiResponse)
    }
    
}

let updateMentor = async (req, res)=>{
    try{
        let details = await new Promise((resolve, reject)=>{
            MentorModel.updateOne({mentor_id:req.body.mentor_id},req.body,(err,data)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        let apiResponse = await response.generate(false, "Mentor details updated", 200, details)
        await res.send(apiResponse)
    } catch(err){
        logger.captureError(err.message, 'mentorController: updateMentor', 10)
        let apiResponse = response.generate(true, 'Failed To update details', 500, null)
        res.send(apiResponse)
    }
}

let deleteMentor = async (req, res)=>{
    try{
        let details = await new Promise((resolve, reject)=>{
            MentorModel.deleteOne({mentor_id:req.params.mentor_id},(err,data)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        let apiResponse = await response.generate(false, "Mentor deleted updated", 200, details)
        await res.send(apiResponse)
    } catch(err){
        logger.captureError(err.message, 'mentorController: deleteMentor', 10)
        let apiResponse = response.generate(true, 'Failed To delete details', 500, null)
        res.send(apiResponse)
    }
}

let addTask = async (req, res)=>{
    try{
        let mentorDetails = await new Promise((resolve, reject)=>{
            MentorModel.findOne({mentor_id:req.body.mentor_id},(err,data)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

        let createTask = await new Promise((resolve, reject)=>{
            let taskDetails = new TaskModel({
                task_id : shortId.generate(),
                task_level : req.body.task_level,
                task_name : req.body.task_name,
                created : time.now()
            })

            taskDetails.save((err,data)=>{
                if(err){
                    reject(err)
                }
                resolve(data)
            })
        })

        let updateTask = await new Promise((resolve, reject)=>{
            
            
            mentorDetailsObj = mentorDetails.toObject()
            delete mentorDetailsObj._id
            delete mentorDetailsObj.__v
            delete mentorDetailsObj.mentor_id

            MentorModel.updateOne({mentor_id:req.body.mentor_id},{$push : {assigned_task: createTask}},(err,data)=>{
                if(err){
                    reject(err)
                } else {
                    console.log(data)
                    resolve(mentorDetailsObj)
                }
            })
        })

        let apiResponse = await response.generate(false, "Mentor Task Added", 200, updateTask)
        await res.send(apiResponse)


    } catch(err){
        logger.captureError(err.message, 'mentorController: addTask', 10)
        let apiResponse = response.generate(true, 'Failed To add task', 500, err.message)
        res.send(apiResponse)
    }
}

module.exports = {
    createMentor : createMentor,
    getAllMentor : getAllMentor,
    getSingleMentor : getSingleMentor,
    updateMentor : updateMentor,
    deleteMentor : deleteMentor,
    addTask : addTask
}