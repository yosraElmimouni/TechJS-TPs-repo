import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/booktracker");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
