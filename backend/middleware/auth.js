import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) =>{
    const {token} = req.headers;
    console.log("token",token)
    if(!token){
        return res.json({success:false,message:"login to open"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Error")
        res.json({success:false,message:error})
    }
}

export default authMiddleware
