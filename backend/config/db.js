import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://shrivastavvaibhavkumar:Vaibhav123@cluster0.ysjgmcb.mongodb.net/food-stack").then(()=>console.log("Database Connected"))
}