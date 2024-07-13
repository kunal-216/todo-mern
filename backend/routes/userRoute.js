import express from "express"
import { getAllUsers, register, getUserDetails, login, logout} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const userRouter = express.Router()

userRouter.get("/all", getAllUsers);
userRouter.post("/new", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

// after /userid/:id hm iske andar kuch bhi bhje server ise id ki trh hi treat krega aur req.params se hm use access kr skte h
// dynamic routes should be in the last to encounter a special exception
// Codes which have same routes but different methods we can write them like this:
userRouter.get("/me", isAuthenticated, getUserDetails)

export default userRouter;