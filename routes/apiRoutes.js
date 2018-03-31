module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
	const db = require("../models");
	const studyController = require("../controllers/studyController");

	//User Profile ---------

	router.post("/profile", isLoggedIn, studyController.createProfile);
	router.patch("/profile", isLoggedIn, studyController.editProfile)
	router.get("/profile", isLoggedIn, studyController.findProfile);

	//Learning Goals -------
	//When View All Learning Goals is Clicked 
	router.get("/allgoals/", studyController.findAllGoals);
	//When one learning goal is clicked
	router.get("/goal/:goalId", studyController.findOneGoal);
	//When submit on new learning goal form is clicked
	router.post("/goal", studyController.createOneGoal);

	//Study Sessions -------

	//When View study session is Clicked 
	router.get("/studysession", isLoggedIn, studyController.findAllStudySessions);
	//When certain event is Clicked 
	router.get("/studysession/:sessionId", isLoggedIn, studyController.findOneStudySessions);
	router.post("/studysession", isLoggedIn, studyController.createStudySession);

return router;
};

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log("logged in!");
		return next();
	}
	console.log("Not authenticated!")
	res.redirect("/"); //determine how to redirect back to current view
};
