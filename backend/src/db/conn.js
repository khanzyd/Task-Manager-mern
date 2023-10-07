const mongoose = require("mongoose");
const URI = "mongodb+srv://khanzyd7:shCOQieDaGMy8xtF@mernprojects.90pggps.mongodb.net/TaskManager"

const connectDB = async () =>{
    await mongoose.connect(URI);
}

module.exports = connectDB;

// mongoose.connect(URI).then(()=>{
//     console.log("connected to db succesfully");
// })