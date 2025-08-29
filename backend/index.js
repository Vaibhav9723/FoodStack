import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cardRouter from "./routes/cardRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app= express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

// DB Connect
connectDB();

// DB Models routes
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cardRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("Backend Connected")
})

app.listen(port,()=>{
    console.log(`Port no :${port}`)
})