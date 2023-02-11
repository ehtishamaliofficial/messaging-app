const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const {token}=require("../controllers/TokenController")

const router=express.Router();

router.get("/",authMiddleware,token);

module.exports=router;