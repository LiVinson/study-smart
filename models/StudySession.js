const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudySession = new Schema({

    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    _goalId: {
        type: Schema.Types.ObjectId,
        ref: "LearningGoal"
    },
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },

    location: {
        type: String,
        required: true
    },

    locationAddress: { //Determine if best to store as coordinates or as address
        type: String
    },
    resources: {
        type: String
    },
    invitees: [{
        type: "String"
    }],

}, {
    timestamps: true
});

module.exports = mongoose.model("StudySession", StudySession);