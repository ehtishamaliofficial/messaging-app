const express=require('express');
const { sendMessage, getAllMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router=express.Router();

router.post('/',authMiddleware,sendMessage)
router.get('/:chatId',authMiddleware,getAllMessage)

module.exports=router;