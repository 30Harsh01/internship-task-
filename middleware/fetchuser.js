const jwt =require("jsonwebtoken");
const User=require("../modules/userSchema");

const fetchuser=async(req,res,next)=>{
    try {
        const token=req.header('auth-token');
        // console.log(token)
        if(!token){
            return res.status(401).json({error:"no token provided"})
        }
        
        const decoded=jwt.verify(token,'internshiptask') 
        if(!decoded){
            return res.status(401).json({error:"invalid token"})
        }
        // console.log(decoded)
        const user=await User.findById(decoded.user.id).select("-password");
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        req.user=user
        next()

    } catch (error) {
        console.log("error in protectRoute",error)
        res.status(500).json({error:"Internal server error"})
    }
}



module.exports= fetchuser