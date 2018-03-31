const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Learner = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: Date,
        required: true,
    },
    learner_status: [{
        type: String,

    }],
    learning_goals: [{
        type: Schema.Types.ObjectId,
        ref: "LearningGoals"
    }]
});

module.exports = mongoose.model("Learner", Learner);