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
    topic: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    locationName: {
        type: String,
        required: true
    },

    locationAddress: { //Determine if best to store as coordinates or as address
        type: String
    },
    resources: {
        type: String
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

});

module.exports = mongoose.model("StudySession", StudySession);