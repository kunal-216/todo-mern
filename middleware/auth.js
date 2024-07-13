import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Login first",
        });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decodedData._id);
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
