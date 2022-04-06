const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Chat = require('../../schemas/ChatSchema');
const User = require("../../schemas/UserSchema");
// const Post = require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({extended: false}));

router.post("/", async (req, res, next) => {
    if (!req.body.users) {
        console.log("Users param not sent with request");
        return res.sendStatus(400);
    }

    var users = JSON.parse(req.body.users);

    if (users.length == 0) {
        console.log("Users array is empty");
        return res.sendStatus(400);
    }

    users.push(req.session.user);

    var chatdata = {
        users: users,
        isGroupChat: true
    };

    Chat.create(chatdata)
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    
});

router.get("/", async (req, res, next) => {
    Chat.find({users: {$elemMatch: { $eq: req.session.user._id}}})
    .populate("users")
    .populate("latestMessage")
    .sort({updatedAt: -1})
    .then(async results => {
        results = await User.populate(results, {path: "latestMessage.sender"});
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    
});

router.get("/:chatId", async (req, res, next) => {
    // console.log(req.params)
    Chat.findOne({_id: req.params.chatId, users: { $elemMatch: { $eq: req.session.user._id}}})
    .populate("users")
    // .populate("latestMessage")
    .then(results => {
        // console.log(results);
        
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    
});

router.put("/:chatId", async (req, res, next) => {
    Chat.findByIdAndUpdate(req.params.chatId, req.body)
    .then(results => {
        res.sendStatus(204);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    
});



module.exports = router;