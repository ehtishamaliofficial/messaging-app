const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../config/ErrorHandler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat=require('../models/chatModel')

const sendMessage=expressAsyncHandler(async(req,res,next)=>{
    const {content,chatId}=req.body;
    if(!content || !chatId){
        return next(new ErrorHandler("Fill All Field to Send Message",400))
    }
    let newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    }
    try {

        let message=await Message.create(newMessage);
        message=await message.populate("sender","name pic");
        message=await message.populate("chat");
        message=await User.populate(message,{
            path:"chat.users",
            select:"name pic email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        });
        res.json({
            success:true,
            message
        })
        
    } catch (error) {
        next(new ErrorHandler(error.message,500))
    }
})

const getAllMessage=expressAsyncHandler(async(req,res,next)=>{
     try {
        const messages=await Message.find({chat:req.params.chatId}).populate('sender','name pic ,email').populate('chat');
        res.json({
            success:true,
            messages
        })
     } catch (error) {
        next(new ErrorHandler(error.message,500))
     }
})


module.exports={sendMessage,getAllMessage}