const User = require("../models").User;

module.exports = {

    getAuthentication: (req, res) => {
		console.log("get  authenthication");
        if (req.isAuthenticated()){
			res.json({
				userId: req.user._id,
				username: req.user.username,
				isAuthenticated: true
			});
			//you can also pass up any other fields you with to expose
			//for example, 
			//nickname: req.user.nickname
		} else { //if user is not authenticated: sends back falsy values for userId, username, authentication false
			res.json({
				userId: null,
				username: null,
				isAuthenticated: false
			});
		}

    },

    createNewUser: (req ,res) => {
        const newUser = req.body;
		User.register(newUser,newUser.password,(err,user)=>{
			if (err){ return res.json(err.message); }
			res.json({
				userId: user._id,
				username: user.username,
				isAuthenticated: true
			});
		});
    },

    signInUser: (req, res) => {
        res.json({
			userId: req.user._id,
			username: req.user.username,
			isAuthenticated: true
		});
    },

    logoutUser: (req, res) => {
		req.logout();
		res.json();
    }
}