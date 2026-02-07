const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    video: String,
    thumbnail: String,
    user: String,
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Video", VideoSchema);