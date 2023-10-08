
class CustomError extends Error {
    constructor(msg, statusCode){
        super(msg);
        this.statusCode = statusCode;
    }
}

const createError = (msg,statusCode) => {
    return new CustomError(msg,statusCode);
}

module.exports = { createError , CustomError };