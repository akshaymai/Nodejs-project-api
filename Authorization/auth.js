const jwt=require('jsonwebtoken')
const {User}=require('../Model/user')
 
 
const auth=async(req,res,next)=>{
    try {
    const token=req.header('Authorization')
    const decode=jwt.verify(token,'abc123')
    const user=await User.findOne({_id:decode._id,'tokens.token':token})
    if(!user)
    {
        throw new Error('User is not found') 
    }
    req.token =token
    req.user=user;
    next();
    }
 catch (error) {
     res.status(401).send('Your Token is invalide!!!')
    next();
}
}

module.exports={auth}