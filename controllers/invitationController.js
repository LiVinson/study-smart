const db = require("../models");

module.exports = {
    /*Method called when api/buddy/invite endpoint hit with request to get the userID from
    User document of record where email address is = invited users email.
    If found, send back confirmation via Id. If not matches found, send back "null"
    */
    getBuddyUserId: (req, res) => {
        console.log("inside controller.getBuddyId:", req.params.buddyEmail)

        db.User.findOne({
                username: req.params.buddyEmail
            }).then(response => {
                if (response) {
                    db.Learner.findOne({
                        _userId: response._id
                    }).then(response => {
                        console.log("response is true", response);
                        res.json(response)
                    })

                } else {
                    res.json("null"); //No user matched with email
                }
            })
            .catch(err => res.status(422).json(err))
    },
    /*
            Called when user sends a POST request to send an invitation to another user (email prviously verified)
            Sent with study session Id and Id of user to invite.
    
            */
    createInvitation: (req, res) => {
        console.log("inside create invitiation. Study session and invite sent:", req.body);
        const sessionId = req.body._id;

        /*Locate the session user has invited others to in order to get the sessionId object. query for 
           that session and add ID of user that was invited to invitedUsers array.
           Fnd a learner with invitee's userId, and push the sessionId into user's invitations array. 


            */

        db.StudySession.findOne({
                _id: sessionId
            }).then(response => {
                console.log("response after querying for studySession: ", response);
                db.StudySession.findOneAndUpdate({
                        _id: response._id
                    }, {
                        $push: {
                            invitedUsers: req.body.invitedUserData._id, //_id from Learner table
                            status: "pending"
                        }

                    })
                    .then(response => {
                            console.log("response after pushing user into StudySession's invitees invitation array ", response);
                            db.Learner.findOneAndUpdate({
                                    _id: req.body.invitedUserData._id,

                                }, {
                                    $push: {
                                        invitations: response._id
                                    }
                                }
                            ).then(response => {
                            //Get updated session to be saved in state (with Invitees)

                            db.StudySession.findOne({
                                _id: sessionId
                            }).populate("invitedUsers").then(response => {
                                console.log("studySession with invited useres populated: response");

                                if (response) {
                                    const msg = `User ${req.body.invitedUserData._userId} has received invitation to session ${sessionId}`
                                    res.status(200).json(response);
                                };
                            })

                        })
                    })
            })
            .catch(err => res.status(422).json(err))

    }
}