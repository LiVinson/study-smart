module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
	const db = require("../models");
	const studyController = require("../controllers/studyController");

	// //User Profile ---------

	router.post("/profile", studyController.createProfile);
	router.patch("/profile/:userId", /*isLoggedIn,*/ studyController.editProfile);
	router.get("/profile/:userId", /*isLoggedIn,*/ studyController.findProfile);

	// //LEARNING GOALS -------

	// //When View All Learning Goals is Clicked 
	router.get("/allgoals/:userId",/*isLoggedIn,*/  studyController.findAllGoals);
	// //When one learning goal is clicked
	router.get("/goal/:goalId", /*isLoggedIn,*/ studyController.findOneGoal);
	// //When submit on new learning goal form is clicked
	router.post("/goal/:userId", /*isLoggedIn,*/ studyController.createOneGoal);
	router.patch("/goal/:goalId", /*isLoggedIn,*/ studyController.editGoal);

	// STUDY SESSIONS  -------

	// //When View study session is Clicked 
	router.get("/studysessions/:userId", /*isLoggedIn,*/  studyController.findAllStudySessions);
	// //When certain event is Clicked 
	router.get("/studysession/:sessionId", /*isLoggedIn,*/  studyController.findOneStudySessions);
	router.post("/studysession/:userId", /*isLoggedIn,*/  studyController.createStudySession);
	router.post("/studyresource/:sessionId", /*isLoggedIn,*/  studyController.addStudyResource)

	//STUDY BUDDIES:
	router.get("/buddyId/:buddyEmail", /*isLoggedIn,*/ studyController.getBuddyUserId)
	router.post("/invite/:userId", /*isLoggedIn,*/ studyController.createInvitation)

	
	
	return router;
};

/*Notes - Need to Do:
	-Need to update/test patch routes for learner, goals, and study sessins
	-Need to add routes to delete learner, goals, study sessions (cascading?)
	-Test with logged in function
	-Separate out into 3 separate route files
	
*/

// const isLoggedIn = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		console.log("logged in!");
// 		return next();
// 	}
// 	console.log("Not authenticated!")
// 	res.redirect("/"); //determine how to redirect back to current view
// };
