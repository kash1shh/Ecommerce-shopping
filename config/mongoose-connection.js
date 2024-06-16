const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require("config");

console.log("Starting MongoDB connection");

mongoose
.connect(`${config.get("MONGODB_URI")}/shopping`)
.then(function(){
    dbgr("Connected to MongoDB");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;