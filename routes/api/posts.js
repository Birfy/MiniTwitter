const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({extended: false}));

router.get("/", async (req, res, next) => {

    var searchObj = req.query;

    if (searchObj.isReply !== undefined) {
        var isReply = searchObj.isReply == 'true';
        searchObj.replyTo = { $exists: isReply};
        delete searchObj.isReply;
        // console.log(searchObj);
    }

    if (searchObj.followingOnly !== undefined) {
        var followingOnly = searchObj.followingOnly == 'true';

        if (followingOnly) {
            var objectIds = [];

            req.session.user.following.forEach(user => {
                objectIds.push(user);
            });

            if (!req.session.user.following) {
                req.session.user.following = [];
            }

            objectIds.push(req.session.user._id);
            searchObj.postedBy = { $in: objectIds};
        }
        
        delete searchObj.followingOnly;
    }
    // Post.find()
    // .populate("postedBy")
    // .populate("retweetData")
    // .sort({"createdAt" : -1})
    // .then(async (results) => {
    //     results = await User.populate(results, {path: 'retweetData.postedBy'});
    //     res.status(200).send(results);
    //     // console.log(results);
    // })
    // .catch((error) => {
    //     console.log(error);
    //     res.sendStatus(400);
    // })
    var results = await getPosts(searchObj);
    res.status(200).send(results);
});

router.get("/:id", async (req, res, next) => {

    var postId = req.params.id;
    // return res.status(200).send("This is awesome");
    var postData = await getPosts({_id:postId});
    postData = postData[0];

    var results = {
        postData: postData
    }

    if (postData.replyTo !== undefined) {
        results.replyTo = postData.replyTo;
    }

    results.replies = await getPosts({replyTo: postId})
    res.status(200).send(results);
});

router.post("/", async (req, res, next) => {
    // console.log(req.body.content);

    if (!req.body.content) {
        console.log("Content param not sent with request");
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    if (req.body.replyTo) {
        postData.replyTo = req.body.replyTo;
    }

    Post.create(postData)
    .then(async (newPost) => {

        newPost = await User.populate(newPost, {path: "postedBy"});

        res.status(201).send(newPost);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(400);
    })
});

router.put("/:id/like", async (req, res, next) => {
    var postId = req.params.id;
    
    var userId = req.session.user._id;

    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    // console.log(isLiked);

    // Insert user like

    var option = isLiked ? "$pull" : "$addToSet";

    // console.log(option);

    req.session.user = await User.findByIdAndUpdate(userId, {
        [option]: {likes: postId}
    }, {new: true})
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    })
    

    // Insert post like

    var post = await Post.findByIdAndUpdate(postId, {
        [option]: {likes: userId}
    }, {new: true})
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    })

    res.status(200).send(post);
});

router.post("/:id/retweet", async (req, res, next) => {

    // return res.status(200).send("Yahoo");
    var postId = req.params.id;
    
    var userId = req.session.user._id;

    // var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    var deletedPost = await Post.findOneAndDelete({postedBy: userId, retweetData: postId})
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    })
    // console.log(isLiked);

    // Insert user like

    var option = deletedPost != null ? "$pull" : "$addToSet";

    var repost = deletedPost;

    if (repost == null) {
        repost = await Post.create({
            postedBy: userId,
            retweetData: postId
        })
        .catch(error =>{
            console.log(error);
            res.sendStatus(400);
        })
    }
    // return res.status(200).send(option);

    req.session.user = await User.findByIdAndUpdate(userId, {
        [option]: {retweets: repost._id}
    }, {new: true})
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    })
    

    // Insert post like

    var post = await Post.findByIdAndUpdate(postId, {
        [option]: {retweetUsers: userId}
    }, {new: true})
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    })

    res.status(200).send(post);
});

router.delete("/:id", async (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => {
        res.sendStatus(202);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});

async function getPosts(filter) {
    var results = await Post.find(filter)
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .sort({"createdAt" : -1})
    .catch((error) => {
        // results
        // res.sendStatus(400);
        console.log(error);
    })
    results = await User.populate(results, {path: 'replyTo.postedBy'});
    return await User.populate(results, {path: 'retweetData.postedBy'});
    
    // return results;
}

module.exports = router;