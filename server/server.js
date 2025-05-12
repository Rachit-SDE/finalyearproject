import express from 'express';
import 'dotenv/config' 
import { connectDB } from './config/dbConfig.js';
import userRouter from './routes/usersRoute.js';
import busRouter from './routes/busRoute.js';
import cors from 'cors'
import bookingRouter from './routes/bookingsRoute.js';



const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.use(cors({
  origin: ['https://captain-iota.vercel.app','https://final-year-client.vercel.app','http://localhost:5174', 'http://localhost:5173'],  // Allow your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// database Connection
connectDB();


app.use("/api/user", userRouter);
app.use("/api/bus", busRouter);
app.use("/api/Booking",bookingRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

// API endPoints




app.listen(port, ()=> console.log(`Server Started on http://localhost:${port}`));
