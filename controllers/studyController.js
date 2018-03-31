const db = require("../models");
const axios = require("axios");


module.export = {
    // Profile
    createProfile: (req, res) => {
        const {userId, first_name, last_name, learner_status} = req.body;
        db.Learner.create({userId: req.body.userId, first})
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },

    editProfile: (req, res) => {
        db.Learner.update({})
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },

    findProfile: (req, res) => {
        db.Learner.findOne({}).then().catch()
    },

   // Goals

    findAllGoals: (req, res) => {
        db.LearningGoal.find({})
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },

    findOneGoal: (req, res) => {
        db.LearningGoal.findOne({})
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },
    createOneGoal: (req, res) => {
        db.LearningGoal.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },

    // Study Sessions
    findAllStudySessions: (req, res) => {
        db.StudySession.find({})
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },

    findOneStudySessions: (req, res) => {
        db.StudySession.findOne({})
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))
    },

    createStudySession: (req, res) => {
        db.StudySession.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(422).json(err))

    },
}