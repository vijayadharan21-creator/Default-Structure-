//import packages
import express from "express";
import {PORT} from './config/env.config.js'
import connectDB from './database/mongodb.js'
import loginRouter from './router/user.router.js'
import errorMiddleware from './middleware/error.middleware.js';
import cors from 'cors';
import tokenRouter from './router/token.router.js';
import cookieParser from 'cookie-parser'
//variable assign
const app=express();
app.use(express.json())
app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use(cookieParser());
//routers
app.use("/api",loginRouter);
app.use("/api/auth",tokenRouter);
app.use(errorMiddleware);
const startServer=()=>{
    try{

        app.listen(PORT,async()=>{
            await connectDB();
            console.log("Server listening at port 5000");
        })

    }catch(e){
        console.error(e.message);
        process.exit(1);
    }
}


//starting server
startServer();