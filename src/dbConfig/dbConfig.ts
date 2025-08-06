import mongoose from "mongoose";

export async function connectToDatabase() {
   try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection= mongoose.connection;

        connection.on("connected", () => {
            console.log("Database connected successfully");
        });
        connection.on("error",(error) => {
            console.error("Database connection error. Please make sure MongoDB is running. Error:", error);
            process.exit(1);
        });
   }catch(error) {
       console.error("Database connection error:", error);
       throw error;
   }
}