import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try{
        const response = await mongoose.connect(uri)
        console.log(response)
        console.log('MongoDB connected')
    }catch (e){
        console.log("DB connection Failed", e)
    }
}