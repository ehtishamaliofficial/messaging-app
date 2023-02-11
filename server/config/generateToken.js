const jwt=require('jsonwebtoken');

function generateToken(userId){
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
}


module.exports=generateToken;
