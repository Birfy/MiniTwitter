const express = require("express");
const app = express();
const port = 3000;
const middleware = require("./middleware");
const server = app.listen(port, () => {
    console.log("Server listening on port " + port)
});
const path = require('path');

app.set("view engine", "pug");
app.set("views", "templates");

app.use(express.static(path.join(__dirname, 'public')));

//Routes

const loginRouter = require("./routes/loginRoutes");

app.use("/login", loginRouter);

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle : "Home"
    }
    res.status(200).render("home", payload);
});