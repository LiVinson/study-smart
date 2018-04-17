const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Learner = new Schema({

    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    learner_status: {
        type: String,

    },

    mobile_number: {
        type: String,
        default:""
    },
    goals: [
        {
        type: Schema.Types.ObjectId,
        ref: "LearningGoal"
      }
    ],
      sessions: [
        {
        type: Schema.Types.ObjectId,
        ref: "StudySession"
      }
    ],
    invitations:[{
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "StudySession"
        },
        status: {
            type: String,
            required:true,
            default:"pending"
        },
        // sessionOwnerId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User"
        // },
        owner: String,
        owner_name: String,
        title: String,
        location: String,
        start: String,
        end: String,
        duration: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Learner", Learner);