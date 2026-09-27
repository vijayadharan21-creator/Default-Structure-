import jwt from 'jsonwebtoken';
import {access_secret,refresh_secret,access_day,refresh_day} from '../config/env.config.js'
export const accessToken=(user)=>{
    const accesstoken=jwt.sign(
        {id:user._id},
        access_secret,
        {expiresIn:access_day}

    )
    return accesstoken;
};

export const refreshToken=(user)=>{
    const refreshtoken=jwt.sign(
        {id:user._id},
        refresh_secret,
        {expiresIn:refresh_day}
    )
    return refreshtoken
}