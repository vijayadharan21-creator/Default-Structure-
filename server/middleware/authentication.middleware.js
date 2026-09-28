import appError from '../utils/errorclass.utils.js';
import jwt from 'jsonwebtoken';
import {access_secret } from '../config/env.config.js'
import User from '../models/user.schema.js'
const authMiddleware=async(req,res,next)=>{
    try{
        const authToken=req.headers.authorization
        if(!authToken || !authToken.startsWith("Bearer ")) throw new appError("Token Not Found", 401);

        const token=authToken.split(" ")[1];

        const decode=jwt.verify(token,access_secret);

        const user= await User.findById(decode.id).select("-password");

        if(!user)throw new appError("User Not Found",401);
        req.user=user;

        next();
    }catch(e){
        next(e)
    }
}

export default authMiddleware