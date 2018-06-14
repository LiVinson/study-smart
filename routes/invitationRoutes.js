module.exports = function (passport) {
    const path = require("path");
    const router = require('express').Router();
    const invitationController = require("../controllers/invitationController");

    //STUDY BUDDIES:
    router.get("/buddyId/:buddyEmail", invitationController.getBuddyUserId);
    router.post("/inviteUser", invitationController.createInvitation);



    return router;
};