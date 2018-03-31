const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudySession = new Schema({
    topic: {
        type: String,
        required: true,
    },
    when: {
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
        ref: "Learner"
    }],
    _goalId: {
        type: Schema.Types.ObjectId,
        ref: "LearningGoal"
    }
});

module.exports = mongoose.model("StudySession", StudySession);