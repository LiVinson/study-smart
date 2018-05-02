{
    const path = require("path");
    const router = require('express').Router();
    const invitationController = require("../controllers/invitationController");

    //STUDY BUDDIES:
    router.get("/buddyId/:buddyEmail", invitationController.getBuddyUserId);
    router.post("/invite/:userId", invitationController.createInvitation);



    return router;
};