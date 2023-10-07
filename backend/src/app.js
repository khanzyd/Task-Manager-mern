const express = require("express");
const connectDB = require("./db/conn")

const Task = require("./models/Task")
const router = require("./router/routes"); 
const page_notFound = require("./middleware/not-found")

const app = express();

// middleware
app.use(express.json());

// Routes
app.use("/api/tasks" , router);
app.use(page_notFound);

// Server
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(port,()=>{console.log(`Server started on port ${port}`)})
    } catch (err) {
        console.log(`Something went wrong : ${err}`);
    }
}

start();