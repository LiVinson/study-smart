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
    owner_name: {
        type:String,
        required:false
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
    invitees: [{
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        first_name: String,
        last_initial: String,
        invite_status: {
            type: String,
            default: "pending"
        }
    }],
    active: {
        type: Boolean,
        required:true,
        default:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("StudySession", StudySession);