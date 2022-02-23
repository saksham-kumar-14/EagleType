const mongoose = require("mongoose");

const user_schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    scores:{
        type:Array,
        required:true
    }
})

const user_model = mongoose.model("users", user_schema);
module.exports = user_model;