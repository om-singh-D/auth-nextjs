import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("No token found");
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedToken.id ? { id: decodedToken.id, email: decodedToken.email, username: decodedToken.username } : null;
    }catch (error:any) {
        throw new Error(error.message || "An error occurred while extracting data from token");
    }
};