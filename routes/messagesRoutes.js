const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const Chat = require("../schemas/ChatSchema");

router.get("/", (req, res, next) => {

    var payload = {
        pageTitle : "Inbox",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        // profileUser: userLoggedIn
    }
    // payload.selectedTab = 'posts'
    res.status(200).render("inboxPage", payload);
});

router.get("/new", (req, res, next) => {

    var payload = {
        pageTitle : "New Message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        // profileUser: userLoggedIn
    }
    // payload.selectedTab = 'posts'
    res.status(200).render("newMessage", payload);
});

router.get("/:chatId", async (req, res, next) => {

    var userId = req.session.user._id;

    var chatId = req.params.chatId;

    // console.log(chatId);

    var isValidId = mongoose.isValidObjectId(chatId);
    // console.log(req.params);
    var payload = {
        pageTitle : "Chat",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        // chat: chat
        // profileUser: userLoggedIn
    }

    if (!isValidId) {
        payload.errorMessage = "Chat does not exist or you do not have permission to view it.";
        return res.status(400).render("chatPage", payload);
    }

    var chat = await Chat.findOne({_id: chatId, users: {$elemMatch: {$eq: userId}}})
    .populate('users');

    if (chat == null) {
        // Check if chat id is really user id

        var userFound = await User.findById(chatId);

        if (userFound != null) {
            // get chat using user id
            chat = await getChatByUserId(userFound._id, userId);
        }
    }

    if (chat == null) {
        payload.errorMessage = "Chat does not exist or you do not have permission to view it.";
    } else {
        payload.chat = chat;
    }
    // payload.selectedTab = 'posts'
    res.status(200).render("chatPage", payload);
});

function getChatByUserId(userLoggedInId, otherUserId) {
    return Chat.findOneAndUpdate({
        isGroupChat: false,
        users: {
            $size: 2,
            $all: [
                {$elemMatch: {$eq: mongoose.Types.ObjectId(userLoggedInId)}},
                {$elemMatch: {$eq: mongoose.Types.ObjectId(otherUserId)}},
            ]
        }
    }, {
        $setOnInsert: {
            users: [userLoggedInId, otherUserId],
        }
    }, {
        new: true,
        upsert: true
    })
    .populate("users");
}

module.exports = router;