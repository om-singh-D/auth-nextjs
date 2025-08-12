import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";

connectToDatabase();

export async function GET(request: NextRequest) {
    try{
        const userId= await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
        const user= await User.findOne({ _id: userId.id }).select("-password");
        return NextResponse.json({ message: "User data fetched successfully", data: user }, { status: 200 });
    }catch(error: any) {
        return NextResponse.json({ error: error.message || "An error occurred while fetching user data" }, { status: 500 });
    }
}