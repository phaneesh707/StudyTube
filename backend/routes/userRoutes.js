import express from 'express'
import { registerUser,loginUser, updateUserProfile } from '../controllers/userControllers.js';
import {protect} from "../middlewares/authMiddleware.js"
const userRoutes = express.Router();

userRoutes.post('/register',registerUser) 
userRoutes.post('/login',loginUser)
userRoutes.post('/profile',protect,updateUserProfile)

export default userRoutes;
