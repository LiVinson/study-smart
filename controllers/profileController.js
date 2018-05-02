const db = require("../models");

module.exports = {

    createProfile: (req, res) => {
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

    findProfile: (req, res) => {
        db.Learner.findOne({
                _userId: req.params.userId
            }).populate({
                path: "goals",
                populate: { path: "sessions" } 
            }) //nested population: populates sessions within the goals goals populated
            .populate("sessions").then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    editProfile: (req, res) => {
        const userId = req.params.userId;
        const { first_name, last_name, learner_status, mobile_number } = req.body;

        db.Learner.update({ _userId: userId }, { $set: { first_name, last_name, learner_status, mobile_number }})
            .then(response => {console.log("response from updating learner", response); res.json(response)})
            .catch(err => res.status(422).json(err))
    }
}