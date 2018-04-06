const db = require("../models");
const axios = require("axios");


module.exports = {
    // USER PROFILE------

    //WORKING(Postman) - Sending name and Id (with out "ObjectId") - need to test with learning status and goals
    createProfile: (req, res) => {
        console.log(req.body);
        const {
            userId,
            first_name,
            last_name,
            mobile_number /*, learner_status*/
        } = req.body;
        db.Learner.create({
                _userId: userId,
                first_name,
                last_name,
                mobile_number
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //WORKING(Postman) - Sending name and Id (with out "ObjectId") - need to test with learning status and goals
    findProfile: (req, res) => {

        db.Learner.findOne({
                _userId: req.params.userId
            }).then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //UPDATE NEEDED - Come back to this later, once profile is showing - determine how to build route no matter what is being edited
    //options: Could do a form that shows everything, and saves all fields
    editProfile: (req, res) => {
        db.Learner.update({})
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },


    // GOALS -----

    //WORKING(Postman) - Pulls all goals associated with user
    findAllGoals: (req, res) => {
        db.LearningGoal.find({
                _userId: req.params.userId
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //WORKING(Postman) - Date format: "2016-06-03T00:00:00.000Z",
    createOneGoal: (req, res) => {
        db.LearningGoal.create(req.body)
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //Needs updates - once goals are displaying
    editGoal: (req, res) => {
        db.LearningGoal.update(req.body)
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //determine if this needed - may store all goals in state, and reference from there...
    findOneGoal: (req, res) => {

        db.LearningGoal.findOne({
                _goalId: req.params.userId
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },


    // STUDY SESSIONS ----------

    //Working (Postman)
    createStudySession: (req, res) => {
        db.StudySession.create(req.body)
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))

    },

    //WORKING(Postman) -
    findAllStudySessions: (req, res) => {
        db.StudySession.find({
                _userId: req.params.userId
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //determine if this needed - may store all events in state, and reference from there...
    findOneStudySessions: (req, res) => {
        db.StudySession.findOne({})
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    }
}

/*Notes - Need to Do:
    -Separate into 3 controller files,
    -Test methods corresponding to patch
    -Add delete methods for learner, goals, study sessions    
	
*/