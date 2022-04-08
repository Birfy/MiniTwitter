const express = require("express");
const app = express();
const port = 80;
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
    console.log("Server listening on port " + port);
});

const io = require("socket.io")(server, {pingTimeout: 60000});


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
const postRouter = require("./routes/postRoutes");
const profileRouter = require("./routes/profileRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const searchRouter = require("./routes/searchRoutes");
const messagesRouter = require("./routes/messagesRoutes");
const notificationsRouter = require("./routes/notificationRoutes");

const postsApiRouter = require("./routes/api/posts");
const usersApiRouter = require("./routes/api/users");
const chatsApiRouter = require("./routes/api/chats");
const messagesApiRouter = require("./routes/api/messages");
const notificationsApiRouter = require("./routes/api/notifications");
const Message = require("./schemas/MessageSchema");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/post", middleware.requireLogin, postRouter);
app.use("/profile", middleware.requireLogin, profileRouter);
app.use("/uploads", uploadRouter);
app.use("/search", middleware.requireLogin, searchRouter);
app.use("/messages", middleware.requireLogin, messagesRouter);
app.use("/notifications", middleware.requireLogin, notificationsRouter);

app.use("/api/posts", postsApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/chats", chatsApiRouter);
app.use("/api/messages", messagesApiRouter);
app.use("/api/notifications", notificationsApiRouter);

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle : "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    res.status(200).render("home", payload);
});

io.on("connection", (socket)=>{
    
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join room", (room) => {
        socket.join(room);
    })

    socket.on("typing", room => {
        socket.in(room).emit("typing");
    })

    socket.on("stop typing", room => {
        socket.in(room).emit("stop typing");
    })

    socket.on("notification received", room => {
        socket.in(room).emit("notification received");
    })

    socket.on("new message", newMessage => {
        var chat = newMessage.chat;

        // console.log(chat.users);

        if (!chat.users)
            return console.log("Chat.users not defined")

        chat.users.forEach(user => {
            if (user._id == newMessage.sender._id) {
                return;
            }
            socket.in(user._id).emit("message received", newMessage);

        })
    })
})