const db = require("../models");
const axios = require("axios");


module.exports = {
    // USER PROFILE------

    //WORKING(Postman)
    createProfile: (req, res) => {
        console.log(req.body);
        const {
            userId,
            first_name,
            last_name,
            mobile_number,
            learner_status
        } = req.body;
        db.Learner.create({
                _userId: userId,
                first_name,
                last_name,
                mobile_number,
                learner_status
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //NEED TO RETEST (Postman) - Sending name and Id (with out "ObjectId") - need to test with learning status and goals
    findProfile: (req, res) => {
        db.Learner.findOne({
                _userId: req.params.userId
            }).populate("goals").populate("sessions").then(response => res.json(response))
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

    //  NEED TO RETEST (Postman) - Pulls all goals associated with user
    findAllGoals: (req, res) => { //Determine if needed
        db.Learner.find({
                _userId: req.params.userId
            }).populate("goals")
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //WORKING (Postman) - Date format: "2016-06-03T00:00:00.000Z",
    //Add a new goal in to LG collection, and update Learner collection with goal's ID. Return updated learner profile
    createOneGoal: (req, res) => {
        db.LearningGoal.create(req.body)
            .then(response => {
                db.Learner.findOneAndUpdate({
                    _userId: req.params.userId
                }, {
                    $push: {
                        goals: response._id
                    }
                }, {
                    new: true
                }).then(profile => {
                    res.json(profile); //confirm if sending profile back is what is needed...
                })

            })
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

    //NEED TO RETEST (Postman)
    createStudySession: (req, res) => {
        db.StudySession.create(req.body)
            .then(response => {
                db.LearningGoal.findOneAndUpdate({
                        _goalId: req.body.goalId
                    }, {
                        $push: {
                            sessions: response._id
                        }
                    }, {
                        new: true
                    }).then(() => {
                        db.Learner.findOneAndUpdate({
                            _userId: req.params.userId
                        }, {
                            $push: {
                                sessions: response._id
                            }
                        }, {
                            new: true
                        })
                    })
                    .then(profile => {
                        res.json(response)
                    })
                    .catch(err => res.status(422).json(err))

            })
    },

    //WORKING(Postman) -
    findAllStudySessions: (req, res) => {
        db.Learner.find({
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