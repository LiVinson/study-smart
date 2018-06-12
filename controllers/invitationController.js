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
                    console.log("response is true", response)
                    res.json(response._id)
                } else {
                    res.json("null"); //No user matched with email
                }
            })
            .catch(err => res.status(422).json(err))
    },
    /*
    Called when user sends a POST request to send an invitation to another user (email prviously verified)

    
    */ 
    createInvitation: (req, res) => {
        console.log("inside create invitiation. Study session sent:", req.body);
        const sessionId = req.body._id;

        // db.Learner.update({userId: req.params.userId}, { $push: {$invitations: {'eventId':eventId, 'status': status, 'owner':owner, 'owner_name':owner_name, 'title': title, 'location': location, 'start': start, 'end': end, 'duration': duration}}})
        // db.Learner.update({_userId: req.params.userId}, { $set: {'invitations.$.eventId': eventId, 'invitations.$.status': status, 'invitations.$.owner': owner, 'invitations.$.owner_name': owner_name, 'invitations.$.title': title, 'invitations.$.location': location, 'invitations.$.start': start, 'invitations.$.end': end, 'invitations.$.duration':duration}})
/*Locate the session user has invited others to in order to get the sessionId object. FInd a learner
    with invitees userId, and push the sessionId into user's invitations array. WIll auto add status of pending

    */

        db.StudySession.findOne({
            _id: sessionId
        }).then(response => {
            db.Learner.findOneAndUpdate({
                _userId: req.params.userId
            }, {
                $push: {
                    invitations: response._id
                }
            })
            .then(response => {
                console.log("response after pushing sessionId into invitation array ", response)
                if (response) {
                    const msg = `User ${req.params.userId} has received invitation to session ${sessionId}`
                    res.status(200).json(msg);
                }
               
            })
            .catch(err => res.status(422).json(err))

        })        

    }
}