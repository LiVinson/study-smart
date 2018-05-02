module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
	const db = require("../models");
	const goalController = require("../controllers/goalController");


//When View All Learning Goals is Clicked 
router.get("/allgoals/:userId", goalController.findAllGoals);
//When one learning goal is clicked
router.get("/goal/:goalId", goalController.findOneGoal);
//When submit on new learning goal form is clicked
router.post("/goal/:userId", goalController.createOneGoal);
//Need to build out on front end
router.patch("/goal/:goalId", goalController.editGoal);

return router;
}