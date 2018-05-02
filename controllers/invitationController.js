const db = require("../models");

module.exports = {
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

    createInvitation: (req, res) => {
        console.log("inside create invitiation", req.body);
        const eventId = req.body._id;
        const status = "pending";
        const invite = {
            owner,
            owner_name,
            title,
            location,
            start,
            end,
            duration
        } = req.body;
        // db.Learner.update({userId: req.params.userId}, { $push: {$invitations: {'eventId':eventId, 'status': status, 'owner':owner, 'owner_name':owner_name, 'title': title, 'location': location, 'start': start, 'end': end, 'duration': duration}}})
        // db.Learner.update({_userId: req.params.userId}, { $set: {'invitations.$.eventId': eventId, 'invitations.$.status': status, 'invitations.$.owner': owner, 'invitations.$.owner_name': owner_name, 'invitations.$.title': title, 'invitations.$.location': location, 'invitations.$.start': start, 'invitations.$.end': end, 'invitations.$.duration':duration}})

        db.Learner.update({
                _userId: req.params.userId
            }, {
                $push: {
                    'invitations.$.eventId': eventId,
                    'invitations.$.status': status,
                    'invitations.$.owner': owner,
                    'invitations.$.owner_name': owner_name,
                    'invitations.$.title': title,
                    'invitations.$.location': location,
                    'invitations.$.start': start,
                    'invitations.$.end': end,
                    'invitations.$.duration': duration
                }
            })
            .then((response) => {
                console.log("response after updating Learner.invitation", response)
                res.json(response);
            })
            .catch(err => res.status(422).json(err))
    }
}