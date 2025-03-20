import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rs3501194:BusSystem123@bussystem.bqeqb.mongodb.net/BusSystem').then(() => console.log("Database Connected"));
}
