const asyncHandler = require('express-async-handler');
const ErrorHandler=require('../config/ErrorHandler');
const Chat=require('../models/chatModel');
const User=require('../models/userModel');

const accessChat=asyncHandler(async(req,res,next)=>{
    const {userId}=req.body;
    let chatData;
    if(!userId){
        return next(new ErrorHandler("Please enter all fields",400));
    }

    let isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}

        ]
        }).populate('users',"-password").populate('latestMessage');

      isChat=await User.populate(isChat,{path:'latestMessage.sender',select:'name pic'});

        if(isChat.length>0){
            return res.send(isChat[0]);
        }
        else{
            chatData={
                chatName:"sender",
                isGroupChat:false,
                users:[req.user._id,userId],
            }
        }
        try {
          const createChat=await Chat.create(chatData);
          const fullChat=await Chat.findById(createChat._id).populate('users',"-password");
          res.send(fullChat);
        }
        catch (error) {
            return next(new ErrorHandler(error.message,400));
        }
});

const fetchChats=asyncHandler(async(req,res,next)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate('users',"-password")
        .populate('latestMessage')
            .populate('groupAdmin',"-password")
            .sort({updatedAt:-1})
            .then(async chats=>{
                chats=await User.populate(chats,{path:'latestMessage.sender',select:'name pic'});
                res.send(chats);
            })
    }
    catch(error){
        return next(new ErrorHandler(error.message,400));
    }
}
);

const createGroup=asyncHandler(async(req,res,next)=>{

       if(!req.body.users || !req.body.name){
         next(new ErrorHandler("Fill All the fields",400))
       }

       let users=JSON.parse(req.body.users);

       if(users.length<2){
          next(new ErrorHandler("More then 2 users are required to create group chat"));
       }

       users.push(req.user);

       try {
        const groupChat=await Chat.create({
            chatName:req.body.name,
            isGroupChat:true,
            users:users,
            groupAdmin:req.user
        });
        const fullChat=await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");
        res.send(fullChat);
        
       } catch (error) {
         next(new ErrorHandler(error.message,500))
       }

});

const renameGroup=asyncHandler(async(req,res,next)=>{
        const {chatId,chatName}=req.body;

        if(!chatId || !chatName){
            next(new ErrorHandler("Fill All the Field",400));
        }

        const updatedChat=await Chat.findByIdAndUpdate(
            chatId,
            {
            chatName:chatName
            },
            {
                new:true
            }
        ).populate("users","-password").populate("groupAdmin","-password")

        if(!updatedChat){
            next(new ErrorHandler("Chat Not Found",400))
        }
        else{
            res.send(updatedChat)
        }

});

const addToGroup=asyncHandler(async(req,res,next)=>{
    const {chatId,userId}=req.body;

    if(!chatId || !userId){
        next(new ErrorHandler("Fill All the Field"));
    }

    const added=await Chat.findByIdAndUpdate(
        chatId,
        {
            $push:{users:userId}
        },
        {
            new:true
        }
        ).populate("users","-password").populate("groupAdmin","-password");

        if(!added){
            next(new ErrorHandler("Chat Group Not Found!",400));
        }
        else{
            res.send(added);
        }

});

const removeToGroup=asyncHandler(async(req,res,next)=>{
    const {chatId,userId}=req.body;

    if(!chatId || !userId){
        next(new ErrorHandler("Fill All the Field"));
    }

    const remove=await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull:{users:userId}
        },
        {
            new:true
        }
        ).populate("users","-password").populate("groupAdmin","-password");

        if(!remove){
            next(new ErrorHandler("Chat Group Not Found!",400));
        }
        else{
            res.send(remove);
        }

});

module.exports={accessChat,fetchChats,createGroup,renameGroup,addToGroup,removeToGroup};
