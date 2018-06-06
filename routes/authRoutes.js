const User = require("../models").User;
const authController = require("../controllers/authController");

module.exports = function (passport) {
	const path = require("path");

	const router = require('express').Router();

	/*Receives request when App.js mounts*/
	router.get("/isAuthenticated", authController.getAuthentication);

	router.post("/signup", authController.createNewUser);

	router.post("/signin",passport.authenticate('local'), authController.signInUser);

	router.get('/logout', authController.logoutUser);

	return router;
};