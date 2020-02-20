const mentorController = require('./../controllers/mentorController')

module.exports.setRouter = (app) =>{
    app.post('/create-mentor', mentorController.createMentor)

    app.get('/get-all-mentor', mentorController.getAllMentor)

    app.get('/get-single-mentor/:mentor_id', mentorController.getSingleMentor)

    app.post('/update-mentor', mentorController.updateMentor)

    app.delete('/delete-mentor/:mentor_id', mentorController.deleteMentor)

    app.post('/add-task', mentorController.addTask)
}