const db = require("../models");
const moment = require('moment');


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
            }).populate({
                path: "goals",
                populate: { path: "sessions" } 
            })
            .populate("sessions").then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },

    editProfile: (req, res) => {
        const userId = req.params.userId;
        const { first_name, last_name, learner_status, mobile_number } = req.body;

        db.Learner.update({ _userId: userId }, { $set: { first_name, last_name, learner_status, mobile_number }})
            .then(response => {console.log("response from updating learner", response); res.json(response)})
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
                _id: req.params.goalId
            }).populate("sessions")
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
    },


    // STUDY SESSIONS ----------

    //NEED TO RETEST (Postman)
    createStudySession: (req, res) => {
        console.log("req.body inside createStudySession method in controller: ", req.body)

        const {
            goalId,
            owner,
            owner_name,
            title,
            start,
            location
        } = req.body;
        // end,

        // duration,
        const duration = parseInt(req.body.duration_hours) + parseInt(req.body.duration_minutes);
        const end = moment(req.body.start).add(duration, "minutes");
        console.log("endtime:", end);
        db.StudySession.create({
                goalId,
                owner,
                owner_name,
                title,
                start,
                duration,
                end,
                location,
            })
            .then(response => {
                console.log("response from creating a studysession", response);
                // console.log(req.body.goalId);
                // console.log("the user Id:", req.params.userId);
                db.LearningGoal.findOneAndUpdate({
                    _id: req.body.goalId
                }, {
                    $push: {
                        sessions: response._id
                    }
                }).then(goalresponse => {
                    console.log("userId:", req.params.userId);

                    console.log("response._id, after pushing into goal.", response._id);
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

    //WORKING(Postman) -
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
    },

    getBuddyUserId: (req, res) => {
        console.log("inside controller.getBuddyId:", req.params.buddyEmail)

        db.User.findOne({
                username: req.params.buddyEmail
            }).then(response => {
                if (response) {
                    console.log("response is true", response)
                    res.json(response._id)
                }
                else {
                    res.json("null"); //No user matched with email
                }                 
            })
            .catch(err => res.status(422).json(err))
    },

    createInvitation:(req, res) => {
        console.log("inside create invitiation", req.body);
        const eventId = req.body._id;
        const status = "pending";
        const  invite ={ owner, owner_name, title, location, start, end, duration } = req.body; 
        // db.Learner.update({userId: req.params.userId}, { $push: {$invitations: {'eventId':eventId, 'status': status, 'owner':owner, 'owner_name':owner_name, 'title': title, 'location': location, 'start': start, 'end': end, 'duration': duration}}})
        // db.Learner.update({_userId: req.params.userId}, { $set: {'invitations.$.eventId': eventId, 'invitations.$.status': status, 'invitations.$.owner': owner, 'invitations.$.owner_name': owner_name, 'invitations.$.title': title, 'invitations.$.location': location, 'invitations.$.start': start, 'invitations.$.end': end, 'invitations.$.duration':duration}})

        db.Learner.update({_userId: req.params.userId}, { $push: {'invitations.$.eventId': eventId, 'invitations.$.status': status, 'invitations.$.owner': owner, 'invitations.$.owner_name': owner_name, 'invitations.$.title': title, 'invitations.$.location': location, 'invitations.$.start': start, 'invitations.$.end': end, 'invitations.$.duration':duration}})
        .then((response)=> {
            console.log("response after updating Learner.invitation", response)
            res.json(response);
        })
        .catch(err => res.status(422).json(err))
    }
}

/*Notes - Need to Do:
    -Separate into 3 controller files,
    -Test methods corresponding to patch
    -Add delete methods for learner, goals, study sessions    
	
*/