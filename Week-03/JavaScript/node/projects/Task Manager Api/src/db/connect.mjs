import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try{
        const response = await mongoose.connect(uri)

        console.log(response)
        console.log("Mongo DB connected")
    }catch (err){
        console.log("DB connection Failed", err)
    }
}
