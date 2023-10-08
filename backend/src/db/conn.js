const mongoose = require("mongoose");

const connectDB = async (uri) =>{
    await mongoose.connect(uri);
}

module.exports = connectDB;

// mongoose.connect(URI).then(()=>{
//     console.log("connected to db succesfully");
// })