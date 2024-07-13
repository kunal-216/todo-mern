import express from "express"
import { getMyTasks, newTask, updateTask, deleteTask } from "../controller/taskController.js";
import {isAuthenticated} from "../middleware/auth.js"

const taskRouter = express.Router()

taskRouter.post("/new", isAuthenticated, newTask)
taskRouter.get("/my", isAuthenticated, getMyTasks)
taskRouter.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default taskRouter;