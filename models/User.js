const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    subscribers: {
        type: Number,
        default: 0
    },
    subscriptions: [String],
    history: [String],
    watchLater: [String]
});

module.exports = mongoose.model("User", UserSchema);