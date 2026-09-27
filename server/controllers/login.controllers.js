import User from "../models/user.schema.js"
import appError from "../utils/errorclass.utils.js"
import bcrypt from 'bcrypt';
import {accessToken,refreshToken} from '../services/key.services.js'
export const register=async(req,res,next)=>{
    try{
        const{name,email,password}=req.body;
        if(!name||!email||!password){
            throw new appError("Invalid Details",400);
        }
        const userExist=await User.findOne({email:email});
        if(userExist){
            throw new appError("User Already Exist",409);
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        const customer=await User.create({
            name,
            email,
            password:hashPassword
        });
        const atoken=accessToken(customer);
        const rtoken=refreshToken(customer);
        res.cookie("refreshtoken",rtoken,{
            httpOnly:true,
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
            success:true,
            message:"User Registered",
            data:{
                id:customer._id,
                token:atoken
            }
        });

    }catch(e){
        next(e);
    }
}

export const login=async(req,res,next)=>{
try{
    const{email,password}=req.body;
    const customer=await User.findOne({email:email});
    if(!customer) throw new appError("User Not Found",404);
   const hashPassword=await bcrypt.compare(password,customer.password);
    if(!hashPassword)throw new appError("Invalid Password",401)
    const atoken=accessToken(customer);
        const rtoken=refreshToken(customer);
        res.cookie("refreshtoken",rtoken,{
            httpOnly:true,
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
            success:true,
            message:"User Login",
            data:{
                id:customer._id,
                token:atoken
            }
        });
}catch(e){
    next(e);
}
}