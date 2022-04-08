// const { $where } = require("../../schemas/ChatSchema");

var connected = false;

var socket = io();

socket.emit("setup", userLoggedIn);

socket.on("connected", () => {
    connected = true;
    // console.log(connected);
})

socket.on("message received", (newMessage) => {
    // console.log("it works");
    messageReceived(newMessage);
})

function messageReceived(newMessage) {
    if ($(`[data-room=${newMessage.chat._id}]`).length == 0) {

        showMessagePopup(newMessage);
        
    } else {
        addChatMessageHtml(newMessage);
        
    }
    refreshMessagesBadge();
}

socket.on("notification received", () => {
    $.get("/api/notifications/latest", (notificationData)=> {
        
        refreshNotificationsBadge()
        showNotificationPopup(notificationData);
    })
})

function emitNotification(userId) {
    if (userId == userLoggedIn._id)
        return;
    
    socket.emit("notification received", userId);
}

