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


app.set("view engine", "pug");
app.set("views", "templates");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes

const loginRouter = require("./routes/loginRoutes");
const registerRouter = require("./routes/registerRoutes");

app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle : "Home"
    }
    res.status(200).render("home", payload);
});