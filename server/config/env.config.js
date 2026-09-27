import dotenv from 'dotenv';
dotenv.config({path:"./config/.env"})
export const{PORT,Mongodb_URL,access_secret,refresh_secret,access_day,refresh_day}=process.env;