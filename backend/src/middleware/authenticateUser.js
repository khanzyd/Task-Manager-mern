


const authenticateUser = async (req,res,next) => {

    console.log("user authenticated");
    next();
}

module.exports = authenticateUser;