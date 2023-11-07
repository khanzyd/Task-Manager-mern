const wrapper = require("../middleware/async-wrapper")
const Task = require("../models/Task");
const { createError } = require("../errors/customError")

const getAllTasks = wrapper(async (req,res) => {
    const tasks = await Task.find({createdBy:req.user.userID});
    res.status(200).json({tasks})
    // res.status(500).send(`Something went wrong! Please try later ${err}`);
})

const createTask = wrapper(async (req,res) => {
    const {task, completed} = req.body;
    const createdBy = req.user.userID;
    const newTask = await Task.create({task,completed,createdBy});
    res.status(201).json({Success: true , task: newTask})
    // res.status(500).json({Success: false , msg: "Something went wrong!" , err })
})

const getTask = wrapper(async (req,res,next) => {
    const createdBy = req.user.userID;
    const { id : taskID } = req.params;
    const task = await Task.findOne({_id:taskID,createdBy});
    if(!task){
        return next(createError(`No such task exist in your tasks list`,404));
        // return res.status(400).json({Success: false, msg: `No such task exist with ID : ${taskID}`})
    }
    // if(task.createdBy != createdBy){
    //     return next(createError(`No task found`,404))
    // }
    console.log(task);
    res.status(200).json({task});
    // res.status(400).send(`Cannot get the data`);
})

const updateTask = wrapper(async (req,res,next) => {
    const createdBy = req.user.userID;
    let {task,completed} = req.body;

    const foundTask = await Task.findOneAndUpdate({_id:req.params.id,createdBy}, {task,completed}, {
        new:true
    });
    if(!foundTask){
        return next(createError(`No such task exist with ID : ${req.params.id}`,404));
        // return res.status(400).json({Success: false, msg: `No such task exist with ID : ${req.params.id}`})
    }
    res.status(200).json({Success: true, foundTask})
    // res.status(400).json({Success: false, msg: `Something went wrong`});
})

const deleteTask = wrapper(async (req,res,next) => {
    
    const createdBy = req.user.userID;
    const task = await Task.findOneAndDelete({_id:req.params.id,createdBy});
    if(!task){
        return next(createError(`Cannot delete as no such task exist with ID : ${req.params.id} in your tasks list`,404));
        // return res.status(400).json({Success: false, msg: `No such task exist with ID : ${req.params.id}`})
    }
    res.status(200).json({Success: true,msg: `Deleted task successfully`, task})
})



module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}