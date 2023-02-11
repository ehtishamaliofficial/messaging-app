const express=require('express');
const {register, login, allUsers,} = require("../controllers/userController");
const authMiddleware=require('../middleware/authMiddleware');

const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.get("",authMiddleware,allUsers)


module.exports=router;
