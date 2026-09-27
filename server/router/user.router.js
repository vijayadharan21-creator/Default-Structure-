import express from 'express';
import {register,login} from '../controllers/login.controllers.js'
const router=express.Router();

router.post("/register",register);
router.get("/register",(req,res)=>{res.send("JI")})
router.post("/login",login);
export default router;