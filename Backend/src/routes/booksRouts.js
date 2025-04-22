import express from "express";
import { Router } from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../model/books.js";
import { protect } from "../../middleware/authMidleware.js";
import { populate } from "dotenv";
import User from "../model/User.js";

const router = Router();

router.post("/", protect, async (req, res) => {

    try {
        
        const { title, caption, image, rating } = req.body;
        
        if(!title || !caption || !image || !rating){
            return res.status(400).json({ message: "Please provide all fields" });
        }

        // upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url; // getting URL from uploaded image to save it into database;

        // saving books to database
        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
            user: req.user._id,
        })
        await newBook.save();
        return res.status(201).json({ message: "book uplaoded succesfully: ", newBook });
    } catch (error) {
        console.log("Error creating new book ", error);
        res.status(500).json({ message: error.message});
    }
});

//get books by infinite scrole with pagination
router.get("/", protect, async (req, res) => {

    try {
        
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * 1;

        const books = await Book.find()
            .sort({ createdAt: -1})
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileImage");

            const totalBooks = await Book.countDocuments();

        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        });

    } catch (error) {
        console.log("Error getting All books route", error);
        res.status(500).json({ message: "Internal Server Error" });
    };
});


//get recomende books by logged in user
router.get("/user", protect, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id }).sort(({ createdAt: -1 }));
        res.json(books);
    } catch (error) {
        console.log("Error geting recomendation", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
});

//deleting books
router.delete("/:id", protect, async (req, res) => {

    try {
        const book = await User.findById(req.param.id);
        if(!book) return res.status(404).json({ message: "Book not found"});

        if(book.user.toString() != req.user._id.toString()){
            return res.status(401).json({ message: "Unauthorized"});
        }

        //deleting image from cloudinary
        if(book.image && book.image.includes("cloudinary")){
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
                
            } catch (error) {
                console.log("Error deleting from cloudinary ", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        }

        await book.deleteOne();
        res.status(201).json({ message: "Book is deleted succesfully"});

    } catch (error) {
        console.log("Error deleting book ", error);
        res.status(500).json({ message: "Internal server Error"});
    }
});

export default router;