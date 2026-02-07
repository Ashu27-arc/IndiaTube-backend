const User = require("../models/User");

exports.addHistory = async (req, res) => {
    const user = await User.findById(req.user);
    if (!user.history.includes(req.body.videoId)) {
        user.history.push(req.body.videoId);
        await user.save();
    }
    res.json({
        msg: "Added to history"
    });
};

exports.addWatchLater = async (req, res) => {
    const user = await User.findById(req.user);
    if (!user.watchLater.includes(req.body.videoId)) {
        user.watchLater.push(req.body.videoId);
        await user.save();
    }
    res.json({
        msg: "Added to watch later"
    });
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            msg: "Server error"
        });
    }
};