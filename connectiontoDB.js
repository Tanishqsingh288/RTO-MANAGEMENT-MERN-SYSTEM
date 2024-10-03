const mongoose = require("mongoose");

const connectiontoDB = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/RTOManegementApp").then(()=>{
        console.log("connected to DB");
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = connectiontoDB;