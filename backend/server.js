import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import taskRouter from "./routes/taskRoute.js"
import { errorMiddleware } from "./middleware/error.js"

dotenv.config()

//app config
const app = express();
const PORT = 4000 || process.env.PORT

// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET","PUT","POST","DELETE"],
    // for headers and cookies to reach the frontend
    credentials: true
}));


// database connection
connectDB();

// routes
app.use("/api/users",userRouter)
app.use("/api/tasks",taskRouter)

// Using error middleware
app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("Api is working")
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});