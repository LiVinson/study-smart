module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
    const profileController = require("../controllers/profileController");

    router.get("/profile/:userId", profileController.findProfile);
    router.post("/profile", profileController.createProfile);
    router.patch("/profile/:userId", profileController.editProfile);
    
    return router;
}
