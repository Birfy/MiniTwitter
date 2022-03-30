const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }


    connect() {
        mongoose.connect("mongodb+srv://admin:642850@minitwittercluster.umzem.mongodb.net/MiniTwitterDB?retryWrites=true&w=majority")
        .then(() => {
        console.log("Database connection successful");
        })
        .catch((err) => {
        console.log("Database connection error" + err);
        })
    }
}

module.exports = new Database();