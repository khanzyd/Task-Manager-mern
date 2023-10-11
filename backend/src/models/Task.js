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
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Userid is needed to create Task"]
    }
},{timestamps:true});

module.exports = mongoose.model("Task", taskschema);