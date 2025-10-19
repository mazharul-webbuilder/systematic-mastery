import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log("MongoDB connected")
    } catch (e) {
        console.log("DB connection Failed", e)
    }
}