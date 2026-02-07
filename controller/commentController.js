const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
    const comment = await Comment.create({
        videoId: req.body.videoId,
        user: req.user,
        text: req.body.text
    });
    res.json(comment);
};

exports.getComments = async (req, res) => {
    const comments = await Comment.find({
        videoId: req.params.id
    });
    res.json(comments);
};