import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";


export const registerUser = asyncHandler(async (req,res)=>{
  const { name, email, password, pic } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error registraiton");
  }
        
    
})



export const loginUser =asyncHandler(async (req,res) =>{
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }

})

export const  updateUserProfile= asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if(req.body.password){
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      pic:updatedUser.pic,
      token:generateToken(updatedUser._id)
    })
  }else{
    res.status(404)
    throw new Error('User not found');
  }
});