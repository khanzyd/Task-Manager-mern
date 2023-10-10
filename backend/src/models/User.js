const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        minlength:4,
        maxlength:20,
        required:[true, "Username must be provided."],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please enter the password"]
    },
    confirmPassword:{
        type:String,
        required:[true, "Please enter the password again to confirm"]
    }
})

userSchema.pre("save", async function(){
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
        this.confirmPassword = this.password;
    } catch (err) {
        res.status(400).send(err);
    }
})

userSchema.methods.createJWT = async function(){

}

module.exports = mongoose.model("User",userSchema);