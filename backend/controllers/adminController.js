import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../model/doctorModel.js"
import jwt from "jsonwebtoken"
//API for adding doctors
const addDoctor= async (req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
        const imageFile=req.file
        console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile)
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,k:"hello",j:4,message:"Some thing is missing",extram:`${degree}`})
        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email, validator failed"})
        }
        //validating strong password
        if(password.length <8){

            return res.json({success:false,message:"Please enter a strong password of minimum 8 characters"})
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        console.log("Uploading image to cloudinary",imageFile)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor =new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})

    } catch(err){

        console.log(err)
        res.json({sucess:"false",message:err.message})

    }
}


//API for admin Login
const loginAdmin = async (req,res)=>{
    try{
        const {email,password} =req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})


        }else{
            res.json({success:false,message:"Invalid email or password"})
        }

    }catch(err){
        console.log(err)
        res.json({sucess:false,message:err.message})
    }
}

//Api to get all doctors list for admin panel
const allDoctors= async (req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select("-password")
        res.json({success:true,doctors})
    }catch(err){
        console.log(err)
        res.json({sucess:false,message:err.message})
    }
}
export  {addDoctor,loginAdmin,allDoctors}