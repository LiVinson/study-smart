const db = require("../models");
const moment = require('moment');

module.exports = {
    findAllGoals: (req, res) => { //Determine if needed
        db.Learner.find({
                _userId: req.params.userId
            }).populate("goals")
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

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

    findOneGoal: (req, res) => {
        db.LearningGoal.findOne({
                _id: req.params.goalId
            }).populate("sessions")
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    editGoal: (req, res) => {
        db.LearningGoal.update(req.body)
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    }
}