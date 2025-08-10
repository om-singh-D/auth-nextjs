import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connectToDatabase()



export async function POST(request: NextRequest) {
    try{
        const reqBody= await request.json()
        const { username, email, password } = reqBody;

        console.log("Received signup request:", reqBody);
        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }


        //check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully", success: true, user: newUser }, { status: 201 });

    }catch (error: any) {
        return NextResponse.json({error: error.message || "An error occurred during signup"}, { status: 500 });
    }
}