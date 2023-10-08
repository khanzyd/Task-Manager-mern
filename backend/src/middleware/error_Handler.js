const {CustomError} = require("../errors/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).send(err.message);
    } else {
        return res.status(400).send(err);
    }
}

module.exports = errorHandlerMiddleware;