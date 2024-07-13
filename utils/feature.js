import jwt from "jsonwebtoken";

export const setCookie = (user,res,message,statusCode=201) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 15 ,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message, 
    });
}