import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


export const protect = async (req, res, next) => {
    console.log("Authorization header:", req.headers.authorization);
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token, authorization denied' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // ✅ FIX: get full user from DB
            // Yeh likho
            const user = await User.findById(decoded.user.id).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user; // yahan _id bhi aayega
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ success: false, message: 'Token is not valid' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};


export const admin = (req, res, next) => {
    console.log("User role:", req.user?.role);
    // 🔐 Yahan ab req.user.role milega
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: 'Aap admin nahi ho, access denied' });
    }
};

