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

userSchema.methods.createJWT = function(){
    return JWT.sign({
        userID:this._id, 
        user:this.userName},
        process.env.JWTSECRET,{expiresIn:process.env.JWTEXPIRY
    });
}

userSchema.methods.isMatch = async function(password){
    return (await bcrypt.compare(password,this.password));
    
}

module.exports = mongoose.model("User",userSchema);