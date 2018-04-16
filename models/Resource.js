const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Resource = new Schema({

    description: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        default: "No URL Provided",
    },
    show: {
        type: Boolean,
        default: true
    },
    
}, {
    timestamps: true
});
module.exports = mongoose.model("Resource", Resource);