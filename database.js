const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }


    connect() {
        console.log(process.env.MONGODB_URI+"/"+process.env.DB_NAME)
        mongoose.connect(process.env.MONGODB_URI+"/"+process.env.DB_NAME)
        .then(() => {
        console.log("Database connection successful");
        })
        .catch((err) => {
        console.log("Database connection error" + err);
        })
    }
}

module.exports = new Database();