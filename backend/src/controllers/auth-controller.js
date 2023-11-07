const User = require("../models/User")
const { createError } = require("../errors/customError")

const registerUser = async (req,res,next) => {
    const {userName, password, confirmPassword} = req.body;
    try {
        if(password === confirmPassword){
            const newUser = await User.create({userName, password, confirmPassword});
            const token = newUser.createJWT();
            res.status(201).json({msg:"User created successfullly" , user:newUser, token});
        }else{
            return next(createError("Password and confirmPassword doesn't match, Please try again.",401))
            // throw new Error("Password and confirmPassword doesn't match, Please try again.");
        }
    } catch (err) {
        next(err)
    }
};


const loginUser = async (req,res,next) => {
    const {userName, password} = req.body;

    if(!userName || !password){
        return next(createError("Please provide Username and Password",401))
    }
    const user = await User.findOne({userName});
    if(!user){
        return next(createError("Invalid Credentials",401));
    }
    const match = await user.isMatch(password);

    if(!match){
        return next(createError("Invalid Credentials",401));
    }

    const token = user.createJWT();
    // res.cookie("jwtToken", token, {
    //     expires:new Date(Date.now() + 1800000),
    //     httpOnly:true
    // })
    res.status(200).json({msg:"Logged in sucessfully", user , token})    
}

module.exports = {registerUser , loginUser}

