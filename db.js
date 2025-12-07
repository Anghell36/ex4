import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/testdb";

export const connectDB = async () => {
     try {
          await mongoose.connect(MONGO_URI);
          console.log("DB connected Successfully");
     } catch (error) {
          console.error("DB connection failed", error);
          console.error(`DB connection error ${error}`)
     }
}