const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LearningGoal = new Schema({

    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

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
    status: {
        type: String,
        required:true,
        default: "active"
    }

}, {
    timestamps: true
});
module.exports = mongoose.model("LearningGoal", LearningGoal);