import errorHandler from "../middleware/error.js"
import Task from "../models/task.js"

const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            return next(new errorHandler("Fields cannot be empty", 400))
        }
        await Task.create({
            title,
            description,
            user: req.user
        })
        return res.status(200).json({
            success: true,
            message: "Task added successfully"
        })
    } catch (error) {
        next(error)
    }
}

const getMyTasks = async (req, res, next) => {
    try {
        const userId = req.user._id
        // woh saare tasks dedo jisme user ki id userid se match ho
        const tasks = await Task.find({ user: userId })

        return res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)

        if (!task) { return next(new errorHandler) }

        task.isCompleted = !task.isCompleted
        await task.save()

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)

        next()

        if (!task) { return next(new errorHandler) }

        await task.deleteOne()
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export { newTask, getMyTasks, updateTask, deleteTask }