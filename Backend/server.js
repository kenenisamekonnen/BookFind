import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/authRoutes.js";
import { connectDB } from "./src/lib/db.js";
import booksRouts from "./src/routes/booksRouts.js";
import cors from "cors";

dotenv.config();

const App = express();
App.use(express.json());
App.use(cors());

App.use('/api/auth', authRoute);
App.use('/api/books', booksRouts);

const port = process.env.PORT || 4000;
App.listen(port, () => {
    console.log(`App is conected using ${port}`);
    connectDB();
})