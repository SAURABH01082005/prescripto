import validator from "validator"

import bcrypt from "bcryptjs"
import userModel from "../model/userModel.js"
import jwt from "jsonwebtoken"

const registerUser=async (req,res)=>{

    try{

        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.json({success:false,message:"All fields are required"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //save user to db
        const user = await userModel.create({name,email,password:hashedPassword})
        res.json({success:true,message:"User registered successfully",user})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})



    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

export {registerUser}