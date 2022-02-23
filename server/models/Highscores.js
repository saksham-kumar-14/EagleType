const mongoose = require("mongoose")

const highscore_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    speed:{
        type:Number,
        required:true
    },
    accuracy:{
        type:String,
        required:true 
    }
})

const highscore_model = mongoose.model("highscores",highscore_schema)
module.exports = highscore_model