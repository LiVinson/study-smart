const User = require("../models").User;

module.exports = {

	/*Checks if user is currently authenticated.
	/ If so, returns username, pass, and true authentication status
	*/
	getAuthentication: (req, res) => {
		console.log("get  authenthication");
		if (req.isAuthenticated()) {
			res.json({
				userId: req.user._id,
				username: req.user.username,
				isAuthenticated: true
			});
		} else { //if user is not authenticated: sends back falsy values for userId, username, authentication false
			res.json({
				userId: null,
				username: null,
				isAuthenticated: false
			});
		}
	},

	/*Called when auth/signup route receives POST request
	//Saves user data entered in login, and registers
	in User  schema.

	Returns json with error message or retrns user info with 
	Authentication true
	*/
	createNewUser: (req, res) => {
		const newUser = req.body;
		console.log("user info in controller:", newUser);
		User.register(newUser, newUser.password, (err, user) => {
			if (err) {
				return res.json(err.message);
			}
			res.json({
				userId: user._id,
				username: user.username,
				isAuthenticated: true
			});
		});
	},

	/*
		Called when POST request received at auth/signin
		receives output from passport.authenticate()
	*/
	signInUser: (req, res) => {
		res.json({
			userId: req.user._id,
			username: req.user.username,
			isAuthenticated: true
		});
	},

	/*
		Called when GET request received at auth/logout.
		Removes the req.user property and clears the login session (if any)
	*/
	logoutUser: (req, res) => {
		req.logout();
		res.json();
	}
}