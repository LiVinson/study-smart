const db = require("../models");
const moment = require('moment');

module.exports = {
    createStudySession: (req, res) => {
        const {
            goalId,
            owner,
            // owner_name,
            title,
            start,
            location
        } = req.body;

        const duration = parseInt(req.body.duration_hours) + parseInt(req.body.duration_minutes);
        const end = moment(req.body.start).add(duration, "minutes");

        db.StudySession.create({
                goalId,
                owner,
                // owner_name,
                title,
                start,
                duration,
                end,
                location,
            })
            .then(response => {
                db.LearningGoal.findOneAndUpdate({
                    _id: req.body.goalId
                }, {
                    $push: {
                        sessions: response._id
                    }
                }).then(goalresponse => {
                    db.Learner.findOneAndUpdate({
                            _userId: req.params.userId
                        }, {
                            $push: {
                                sessions: response._id
                            }
                        })
                        .then(profile => {
                            res.json(response)
                        })
                        .catch(err => res.status(422).json(err))
                })
            })
    },

    findAllStudySessions: (req, res) => {
        db.Learner.find({
                _userId: req.params.userId
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    //Locate study session, and get associated resources for display
    findOneStudySessions: (req, res) => {
        console.log("inside controller.findOneStudySession - req.params.sessionId", req.params.sessionId)
        db.StudySession.findOne({
                _id: req.params.sessionId
            }).populate("resources")
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    addStudyResource: (req, res) => {
        const {
            description,
            url
        } = req.body;
        db.Resource.create({
                description,
                url
            })
            .then(response => {
                db.StudySession.findOneAndUpdate({
                        _id: req.params.sessionId
                    }, {
                        $push: {
                            resources: response._id
                        }
                    }, {
                        new: true
                    })
                    .then(sessionResponse => {
                        res.json(sessionResponse)
                    })
                    .catch(err => res.status(422).json(err))

            })
    }
}