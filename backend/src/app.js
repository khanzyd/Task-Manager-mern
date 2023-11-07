
const express = require("express");
const connectDB = require("./db/conn")
const dotenv = require("dotenv");
// Enables CORS
const cors = require('cors');
dotenv.config();

const taskRouter = require("./router/routes"); 
const authRouter = require("./router/auth")
const page_notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error_Handler")
const authenticateUser = require("./middleware/authenticateUser")


const app = express();

// middleware
app.use(express.json());
app.use( cors({ origin: "http://localhost:3000",
    "Access-Control-Allow-Origin" : "http://localhost:3000"
}) );
// Routes
app.use("/api/auth" , authRouter)
app.use("/api/tasks", authenticateUser , taskRouter);
app.use(page_notFound);

app.use(errorHandlerMiddleware)
// Server
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{console.log(`Server started on port ${port}`)})
    } catch (err) {
        console.log(`Something went wrong : ${err}`);
    }
}

start();