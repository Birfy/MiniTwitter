const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {

    var payload = createPayload(req.session.user);
    payload.selectedTab = 'posts'
    res.status(200).render("searchPage", payload);
});

router.get("/:selectedTab", (req, res, next) => {

    var payload = createPayload(req.session.user);
    payload.selectedTab = req.params.selectedTab;
    res.status(200).render("searchPage", payload);
});

function createPayload(userLoggedIn) {
    return {
            pageTitle : "Search",
            userLoggedIn: userLoggedIn,
            userLoggedInJs: JSON.stringify(userLoggedIn),
            profileUser: userLoggedIn
    };
}

module.exports = router;