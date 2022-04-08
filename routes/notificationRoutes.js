const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {

    var payload = {
        pageTitle : "Notifications",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        // profileUser: req.session.user
    }
    res.status(200).render("notificationsPage", payload);
});

module.exports = router;