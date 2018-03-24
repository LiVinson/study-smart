module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();


	router.use("/auth",require("./authRoutes.js")(passport));
	router.use("/api",require("./apiRoutes.js")(passport));
	//add more routes here
	

	// If no API routes are hit, send the React app
	router.use(function(req, res) {
	  res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});

	return router;
};