import jwt from "jsonwebtoken"

//takes id from db return encrypted token to frontend
const generateToken = (id) =>{
    // console.log(process.env.JWT_SECRET)
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    })      
}

export default generateToken;