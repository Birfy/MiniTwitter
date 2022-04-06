// const { $where } = require("../../schemas/ChatSchema");

var connected = false;

var socket = io();

socket.emit("setup", userLoggedIn);

socket.on("connected", () => {
    connected = true;
    // console.log(connected);
})

socket.on("message received", (newMessage) => {
    messageReceived(newMessage);
})

function messageReceived(newMessage) {
    if ($(".chatContainer").length == 0) {
        alert(newMessage);
    } else {
        addChatMessageHtml(newMessage);
    }
}

