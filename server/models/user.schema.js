import mongoose from 'mongoose';

const schema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        min:6
    }
});

const User =mongoose.model("Users",schema);

export default User;