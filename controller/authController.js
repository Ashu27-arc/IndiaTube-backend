const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed
    });

    res.json({
        message: "User Registered"
    });
};

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    });
    if (!user) return res.status(400).json({
        msg: "User not found"
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({
        msg: "Wrong password"
    });

    const token = jwt.sign({
            id: user._id
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
    );

    res.json({
        token,
        user
    });
};

exports.subscribe = async (req, res) => {
    const channel = await User.findById(req.params.id);
    const user = await User.findById(req.user);

    if (!user.subscriptions.includes(channel._id)) {
        user.subscriptions.push(channel._id);
        channel.subscribers += 1;
        await user.save();
        await channel.save();
    }

    res.json({
        msg: "Subscribed"
    });
};