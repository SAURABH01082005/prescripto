import validator from "validator"
import {v2 as cloudinary} from "cloudinary"

import bcrypt from "bcryptjs"
import userModel from "../model/userModel.js"
import jwt from "jsonwebtoken"
import { json } from "express"

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
        res.json({success:true,message:"User registered successfully"})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})



    }catch(err){
        
        res.json({success:false,message:err.message})
    }
}


const loginUser =async (req,res)=>{
    try{
        const {email,password}=req.body
        // if(!email || !password){
        //     return res.json({success:false,message:"All fields are required"})
        // }
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        };
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
        


    }catch(err){
        
        res.json({success:false,message:err.message})
    }
}


const getProfile = async (req,res)=>{
    try{
        const userId = req.userId//will be equal to token
        const userData = await userModel.findById(userId).select("-password")
        
        res.json({success:true,userData})


    }catch(err){
        res.json({success:false,message:err.message})
    }
}

//api to update user profile
const updatePofile = async (req,res)=>{
    try{
        req.body.userId=req.userId

        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile = req.file


        
        
        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"Data missing"})
        }
        let addressData = address
        while (typeof addressData==="string") {
            addressData=JSON.parse(addressData)
            console.log("Parsing address data")
        }
        console.log("out of loop")
        console.log(typeof address)
        await userModel.findByIdAndUpdate(userId,{name,phone,address:addressData,dob,gender})

        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:"Profile updated successfully"})

    }catch(err){
        res.json({success:false,message:err.message})
    }
}

//api to book appointment

const bookAppointment = async (req,res)=>{
    try{
        const {userId,docId,slotTime,slotDate}=req.body
        const docData =await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false,message:"Doctor is not available"})
        }
        let slots_booked = docData.slots_booked
        //checking for slot avalability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime))
                return res.json({success:false,message:"Slot not available"})
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")
        delete docData.slots_booked
        const appointment ={
            userId,
            docId,
            slotTime,
            docData,
            userData,
            amount:docData.fees,
            date:Date.now(),
        }
        const newAppointment = new appointmentModel(appointment)
        await newAppointment.save()
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment booked successfully"})


    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}


export {registerUser,loginUser,getProfile, updatePofile,bookAppointment}