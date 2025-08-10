import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connectToDatabase()

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log("Received login request:", reqBody);
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const tokenData={
            id: user._id,
            email: user.email,
            username: user.username
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });

        const response =NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true});

        return response;
    }catch (error: any) {
        return NextResponse.json({ error: error.message || "An error occurred during login" }, { status: 500 }); 
    }
}