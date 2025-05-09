import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    profileImage:{
        type: String,
        default:""
    }
});

const User = mongoose.model("User", userSchema);
export default User;