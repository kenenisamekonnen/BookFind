import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo = process.env.MONGO_URL;

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(mongo);
        console.log(`Database connected ${con.connection.host}`);
    } catch (error) {
        console.log("error connecting databse ", error);
        process.exit(1);
    }
}