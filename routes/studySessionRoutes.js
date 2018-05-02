module.exports = function (passport) {
    const path = require("path");
    const router = require('express').Router();
    const db = require("../models");
    const studySessionController = require("../controllers/studySessionController");

    // //When View study session is clicked on calendar
    router.get("/studysessions/:userId", studySessionController.findAllStudySessions);
    // //When certain event is Clicked 
    router.get("/studysession/:sessionId", studySessionController.findOneStudySessions);
    router.post("/studysession/:userId", studySessionController.createStudySession);
    router.post("/studyresource/:sessionId", studySessionController.addStudyResource);

    return router;
}