import {refresh_secret}from '../config/env.config.js'
import appError from '../utils/errorclass.utils.js';
import User from '../models/user.schema.js'
import {accessToken,refreshToken} from '../services/key.services.js';
import jwt from 'jsonwebtoken';
export const accesstoken=async(req,res,next)=>{
    try{
        const token=req.cookies.refreshtoken;

        if(!token)
            throw new appError("Refresh Token Not Found",401);
        const decode=jwt.verify(token,refresh_secret)
        const user= await User.findById(decode.id);

        if(!user)
            throw new appError("User Not Found",404);
        const aToken=accessToken(user);
        const rToken=refreshToken(user);
        res.cookie("refreshtoken",rToken,{
            httpOnly:true,
            maxAge:7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success:true,
            aToken
        })
        
    }catch(e){
        next(e);
    }
}
