const User = require("../models/User")

const registerUser = async (req,res,next) => {
    const {userName, password, confirmPassword} = req.body;
    // if(!password || !confirmPassword){
    //     res.status(400)
    // }

    try {
        if(password === confirmPassword){
            const newUser = await User.create({userName, password, confirmPassword});
            res.status(201).json({msg:"User created successfullly" , User:newUser});
        }else{
            throw new Error("Password and confirmPassword doesn't match, Please try again.");
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
    // if(password === confirmPassword){
    //     try {
    //         const newUser = await User.create({userName, password, confirmPassword});
    //         res.status(201).json({msg:"User created successfullly" , User:newUser});
    //     } catch (err) {
    //         res.status(401).send(err);
    //     }  
    // }else{
    //     throw new Error("Password and confirmPassword doesn't match, Please try again.");
    // }

};


const loginUser = async () => {

}

module.exports = {registerUser , loginUser}

