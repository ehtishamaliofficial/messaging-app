const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const ErrorHandler=require('../config/ErrorHandler');
const generateToken = require('../config/generateToken');

const register =asyncHandler(async (req,res,next)=>{
     const {name,email,password,pic}=req.body;
     if (name || email || password) {
         const userExists=await User.findOne({email});
            if (userExists) {
                return next(new ErrorHandler('User already exists',400));
            }
            const user=await User.create({
                name,
                email,
                password,
                pic
            });
            res.status(201).json({
                success:true,
                tokens:generateToken(user._id),
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic
                }
            })
     }
        else {
            return next(new ErrorHandler("Please enter all fields",400));
        }
});

const login =asyncHandler(async (req,res,next)=> {
    const {email, password} = req.body;
    if (email || password) {
        const user = await User.findOne({email});
        if (user && (await user.verifyPassword(password))) {
            res.status(200).json({
                success:true,
                tokens:generateToken(user._id),
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic
                }
            })
        }
        else{
            return next(new ErrorHandler("Email or Password are Incroect!",400))
        }
    }
    else {
        return next(new ErrorHandler("Please enter all fields",400));
    }
});


//api/user?search=xyz
const allUsers =asyncHandler(async (req,res,next)=>{
    const keyword=req.query.search?{
        name:{
            $regex:req.query.search,
            $options:'i'
        }
    }:{};
    const users=await User.find({...keyword}).find({_id:{$ne:req.user._id}}).select("-password");
    res.send(users);
})





module.exports={register,login,allUsers};
