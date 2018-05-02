const User = require("../models").User;
const authController = require("../controllers/authController");

module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();

	router.get("/isAuthenticated", authController.getAuthentication
	// function(req,res){ //When isAuthenticated is hit, checkks if user is logged in, and sends back userId, username, and authentication status:true
	// 	if (req.isAuthenticated()){
	// 		res.json({
	// 			userId: req.user._id,
	// 			username: req.user.username,
	// 			isAuthenticated: true
	// 		});
	// 		//you can also pass up any other fields you with to expose
	// 		//for example, 
	// 		//nickname: req.user.nickname
	// 	} else { //if user is not authenticated: sends back falsy values for userId, username, authentication false
	// 		res.json({
	// 			userId: null,
	// 			username: null,
	// 			isAuthenticated: false
	// 		});
	// 	}
	// }
);

	router.post("/signup", authController.createNewUser
	// function(req,res){ //when signup endpoint is hit, create a newUser from provided data. sends user, user pw, and cb function that takes in 2 parameters: error and userOBject
	// 	const newUser = req.body;
	// 	User.register(newUser,newUser.password,(err,user)=>{
	// 		if (err){ return res.json(err.message); }
	// 		res.json({
	// 			userId: user._id,
	// 			username: user.username,
	// 			isAuthenticated: true
	// 		});
	// 	});
	// }
);

	router.post("/signin",passport.authenticate('local'), authController.signInUser 
	
	// function(req,res){ //When signin endpoint is hit, calls passport method, and another function that takes ---
	// 	// console.log(req.user);
	// 	res.json({
	// 		userId: req.user._id,
	// 		username: req.user.username,
	// 		isAuthenticated: true
	// 	});
	// }
);

	router.get('/logout', authController.logoutUser
	
	// function(req, res) {
	// 	req.logout();
	// 	res.json();
	// }
);

	return router;
};