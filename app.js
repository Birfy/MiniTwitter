const express = require("express");
const app = express();
const port = 3000;
const middleware = require("./middleware");
const server = app.listen(port, () => {
    console.log("Server listening on port " + port)
});
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");


app.set("view engine", "pug");
app.set("views", "templates");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "birfy",
    // force the session to save
    resave: true,
    saveUninitialized: false
}))

//Routes

const loginRouter = require("./routes/loginRoutes");
const registerRouter = require("./routes/registerRoutes");

app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle : "Home",
        userLoggedIn: req.session.user
    }
    res.status(200).render("home", payload);
});