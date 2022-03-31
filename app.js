const express = require("express");
const app = express();
const port = 3000;
const middleware = require("./middleware");
// const https = require("https")
// const fs = require("fs")

// https.createServer( {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem")
// },app).listen(port, ()=>{
//     console.log("Server listening on port " + port)
// })
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
const logoutRouter = require("./routes/logoutRoutes");
const postsApiRouter = require("./routes/api/posts");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/api/posts", postsApiRouter);

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle : "Home",
        userLoggedIn: req.session.user
    }
    res.status(200).render("home", payload);
});