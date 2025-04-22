import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
    
    const authHeader = req.header("Authorization");
    const bearer = authHeader.startsWith("Bearer");

    if(!authHeader || !bearer){
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        console.log("decoded: ", decoded);
        next();
    } catch (error) {
        console.error("Token verification failed:", err);
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}