const wrapper = require("../middleware/async-wrapper")
const Task = require("../models/Task");
const { createError } = require("../errors/customError")

const getAllTasks = wrapper(async (req,res) => {
        const tasks = await Task.find({});
        res.status(200).json({tasks})
        // res.status(500).send(`Something went wrong! Please try later ${err}`);
})

const createTask = wrapper(async (req,res) => {
        const newTask = await Task.create(req.body);
        console.log(newTask);
        res.status(201).json({Success: true , task: newTask})
        // res.status(500).json({Success: false , msg: "Something went wrong!" , err })
})

const getTask = wrapper(async (req,res,next) => {
        const { id : taskID } = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return next(createError(`No such task exist with ID : ${taskID}`,404));
            // return res.status(400).json({Success: false, msg: `No such task exist with ID : ${taskID}`})
        }
        console.log(task);
        res.status(200).json({task})
        // res.status(400).send(`Cannot get the data`);
})

const updateTask = wrapper(async (req,res,next) => {
        const { id : taskID } = req.params;
        
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        });
        if(!task){
            return next(createError(`No such task exist with ID : ${req.params.id}`,404));
            // return res.status(400).json({Success: false, msg: `No such task exist with ID : ${req.params.id}`})
        }
        res.status(200).json({Success: true, task})
        // res.status(400).json({Success: false, msg: `Something went wrong`});
})

const deleteTask = wrapper(async (req,res,next) => {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return next(createError(`No such task exist with ID : ${req.params.id}`,404));
            // return res.status(400).json({Success: false, msg: `No such task exist with ID : ${req.params.id}`})
        }
        // res.status(200).json({Success: true,msg: `Deleted task successfully`, task})
})



module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}