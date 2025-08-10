import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "provide a username"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide a password"],
        minlength: [6, "password must be at least 6 characters long"]
    },
    // role: {
    //     type: String,
    //     enum: ["user", "admin"],
    //     default: "user"
    // }
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgetPasswordToken: {
        type: String,
        default: null
    },
    forgetPasswordTokenExpiry: {
        type: Date,
        default: null
    },
    verifyToken: {
        type: String,
        default: null
    },
    verifyTokenExpiry: {
        type: Date,
        default: null
    }, //where is this comma allowed at the last object and where not?
},{ timestamps: true });

const User = mongoose.model("User", userSchema) || mongoose.models.users;

export default User;