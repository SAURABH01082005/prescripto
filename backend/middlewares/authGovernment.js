import jwt from 'jsonwebtoken'

//nagaArogya  authentication middleware
const authGovernment = async (req,res,next)=>{
    try{
        const {gtoken} = req.headers
        if(!gtoken){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(gtoken,process.env.JWT_SECRET_GOVERNMENT)
        if(token_decode !== process.env.NAGAR_AAROGYA_EMAIL + process.env.NAGAR_AAROGYA_PASSWORD){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
       
        next();

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

export default authGovernment