import mongoose from 'mongoose';
import {Mongodb_URL} from '../config/env.config.js'
const connectDB=async()=>{
    try{
        await mongoose.connect(Mongodb_URL);
        console.log("DataBase Connected ");

    }catch(e){
        console.error(e.message);
    }
}
export default connectDB;