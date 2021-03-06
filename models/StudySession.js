const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudySession = new Schema({

    goalId: {
        type: Schema.Types.ObjectId,
        ref: "LearningGoal"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sessionOwnerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,   
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required:true
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
    resources: [
        {
        type: Schema.Types.ObjectId,
        ref: "Resource"
        }
    ],
    invitedUsers: [
        {
            
            type: Schema.Types.ObjectId,
            ref: "Learner"
        }, 
    
    ],
    active: {
        type: Boolean,
        required:true,
        default:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("StudySession", StudySession);