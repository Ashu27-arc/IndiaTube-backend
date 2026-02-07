const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
    const video = await Video.create({
        title: req.body.title,
        description: req.body.description,
        video: req.file.filename,
        user: req.body.user
    });
    res.json(video);
};

exports.getVideos = async (req, res) => {
    const videos = await Video.find()
        .populate('user', 'username email')
        .sort({
            createdAt: -1
        });
    res.json(videos);
};

exports.likeVideo = async (req, res) => {
    const video = await Video.findById(req.params.id);
    video.likes += 1;
    await video.save();
    res.json(video);
};

exports.searchVideos = async (req, res) => {
    const q = req.query.q;
    const videos = await Video.find({
        title: {
            $regex: q,
            $options: "i"
        }
    });
    res.json(videos);
};
exports.recommendVideos = async (req, res) => {
    const videos = await Video.find().limit(10);
    res.json(videos);
};