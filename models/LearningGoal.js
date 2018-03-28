const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LearningGoal = new Schema({
    category: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    goal: {
        type: String,
        required: true
    },
    measurement: [{
            type: String,
            required: true
        }

    ],
    // `studyEvents` is an array that stores ObjectIds
    // The ref property links these ObjectIds to the StudySession model
    // This allows us to populate the LearningGoal with any associated StudySessions
    studyEvents: [{
        type: Schema.Types.ObjectId,
        ref: "StudySession"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("LearningGoal", LearningGoal);