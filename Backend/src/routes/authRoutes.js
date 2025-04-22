import express from "express";
import { Router } from "express";
import User from "../model/User.js";
import { comparePassword, hashPassword } from "../config/bcrypt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = Router();
dotenv.config();

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});
}

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
        const user = new User({
            username,
            email,
            password: hashedPassword,
            profileImage
        });

        await user.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    };
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user =await User.findOne( { email } );
    if(!user){
        return res.status(404).json({ message: "User not try Registering First"});
    };

    const isMatch = await comparePassword(password, user.password);
    if(!isMatch){
        return res.status(404).json({ message: "Invalid Credintial"});
    };

    const token = generateToken(user._id);
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json({
        token,
        userWithoutPassword,
        user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage
        },
    });
})

export default router;