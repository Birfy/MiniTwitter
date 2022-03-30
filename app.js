const express = require("express");

const app = express();

const port = 3000;

const server = app.listen(port, () => {
    console.log("Server listening on port " + port)
});

app.set("view engine", "pug");
app.set("views", "templates");

app.get("/", (req, res, next) => {
    var payload = {
        pageTitle : "Home"
    }
    res.status(200).render("home", payload);
});