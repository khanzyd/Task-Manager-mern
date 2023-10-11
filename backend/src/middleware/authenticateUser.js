const JWT = require("jsonwebtoken");
const { createError } = require("../errors/customError")

const authenticateUser = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return next(createError("Please login",401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const verifiedUser = JWT.verify(token,process.env.JWTSECRET);
        req.user = {userID:verifiedUser.userID, user:verifiedUser.user}
        next()
    } catch (err) {
        return next(createError("Invalid Credentials",401))
    }
}

module.exports = authenticateUser;