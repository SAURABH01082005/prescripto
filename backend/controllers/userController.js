import validator from "validator"
import {v2 as cloudinary} from "cloudinary"

import bcrypt from "bcryptjs"
import userModel from "../model/userModel.js"
import jwt from "jsonwebtoken"
import { json } from "express"
import doctorModel from "../model/doctorModel.js"
import appointmentModel from "../model/appointmentModel.js"
import Razorpay from "razorpay"

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
    const userId= req.userId
    req.body.userId=userId
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
        console.log("userData",userData);
        delete docData.slots_booked
        const appointment ={
            userId,
            docId,
            slotTime,
            slotDate,
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


//api to get list of appointment for frontend myappointment page
const listAppointments = async (req,res)=>{
    const userId = req.userId
    // req.body.userId=userId
    try{
        // const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments})

    }catch(err){
        res.json({success:false,message:err.message+"hello"})
    }
}

//api to cancel appointment 
const cancelAppointment = async (req,res)=>{
    try{
        const userId = req.userId
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        //verify appointment user
        if(appointmentData.userId!==userId){
            return res.json({success:false,message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing doctor slot

        const {docId , slotDate,slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(slot=>slot!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointment cancelled successfully"})

    }catch(err){
        res.json({success:false,message:err.message})
    }
}

//api to make payment for appointment using razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
const paymentRazorpay = async (req,res)=>{
    try{

        const {appointmentId} = req.body
        
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment not found or already cancelled"})
        }

        //creating options for razorpay payment
        const options = {
            amount: appointmentData.amount*100, //razorpay works with paise
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        //creation of order

        const order = await razorpayInstance.orders.create(options)
        res.json({success:true,order})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }

}

//api to verify the razorpay payment
const verifyRazorpay = async (req,res) =>{
    try{
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)//getting order info which has receipt as _id
        console.log(orderInfo)

        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment Successfull"})
        }
        else{
            res.json({success:false,message:"Payment failed"})
        }
    }catch(err){
        console.log(err.message)
        res.json({success:false,message:err.message})
    }
}


export {registerUser,loginUser,getProfile, updatePofile,bookAppointment,listAppointments,cancelAppointment,paymentRazorpay,verifyRazorpay}