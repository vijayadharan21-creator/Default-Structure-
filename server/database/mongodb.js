import mongoose from 'mongoose';
import {Mongodb_URL} from '../config/env.config.js'
const connectDB=async()=>{
    try{
        if(await mongoose.connect(Mongodb_URL)){
            console.log("DataBase Connected ");
            console.log(Mongodb_URL)
        }else{
            console.log("database not connected")
        }

    }catch(e){
        console.error(e.message);
    }
}
export default connectDB;