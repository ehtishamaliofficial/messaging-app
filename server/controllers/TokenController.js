const asyncHandler=require("express-async-handler")

const token=asyncHandler(async(req,res,next)=>{
    res.json({
        success:true,
        message:"Token Verified!"
    })
})

module.exports={token}