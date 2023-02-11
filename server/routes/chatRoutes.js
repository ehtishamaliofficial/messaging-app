const express=require('express');
const {accessChat,fetchChats, createGroup,renameGroup,addToGroup,removeToGroup} = require("../controllers/chatController");
const authMiddleware=require('../middleware/authMiddleware');

const router=express.Router();

router.post("/",authMiddleware,accessChat)
router.get("/",authMiddleware,fetchChats)
router.post("/createGroup",authMiddleware,createGroup)
router.put("/renameGroup",authMiddleware,renameGroup);
router.put("/addToGroup",authMiddleware,addToGroup);
router.put("/removeToGroup",authMiddleware,removeToGroup)



module.exports=router;
