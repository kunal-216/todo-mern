import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { setCookie } from "../utils/feature.js"
import errorHandler from "../middleware/error.js"

const getAllUsers = async (req, res, next) => {
    // // we can add these queries in the query parameter and they will be included in the searchbar
    // // console.log(req.query)
    try {
        const users = await User.find({});
        res.json({
            success: true,
            users,
        });
    } catch (error) {
        next(error)
    }
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return next(new errorHandler("User already exists. Please login", 400))
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        setCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new errorHandler("Invalid Email or Password", 400))
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(new errorHandler("Invalid Email or Password", 400))

        }
        setCookie(user, res, `Welcome back ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
};

const logout = (req, res, next) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        next(error)
    }
};

const getUserDetails = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
};

export { getAllUsers, register, getUserDetails, login, logout };
