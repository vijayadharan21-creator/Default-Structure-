import express from 'express';
import {accesstoken} from '../controllers/refersh.controller.js'

const router =express.Router();

router.post('/refresh',accesstoken)
export default router;