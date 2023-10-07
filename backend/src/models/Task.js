const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const taskschema = Schema({
    task:{
        type:String,
        required:[true , "Task cannot be empty."]
    }, 
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Task", taskschema);