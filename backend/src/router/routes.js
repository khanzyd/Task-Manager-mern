const express = require("express");
const router = express.Router();
const Task = require("../models/Task")
const {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/task-controllers")

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

// router.route("/").get((req,res)=>{
//     console.log("tasks");
//     res.status(200).send("all tasks");
// }).post((req,res)=>{
//     console.log("task added successfully");
//     res.status(201).send("task added ")
// });

module.exports = router;