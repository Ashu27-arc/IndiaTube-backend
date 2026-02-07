const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    videoId: String,
    user: String,
    text: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", CommentSchema);