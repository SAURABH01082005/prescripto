
import bcrypt from "bcryptjs"
import doctorModel from "../model/doctorModel.js"
import decrypt from "bcrypt"
import jwt from "jsonwebtoken"

const changeAvailability = async (req,res) => {
    try{
        const {doctorId} = req.body
        const docData = await doctorModel.findById(doctorId)
        await doctorModel.findByIdAndUpdate(doctorId,{available:!docData.available})
        res.json({success:true,message:`Doctor availability changed `})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    } 
}

const doctorList = async (req,res) => {
    try{
        const doctors = await doctorModel.find({}).select(["-password","-email"])
        res.json({success:true,doctors})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//api for doctor login
const loginDoctor= async(req,res)=>{

    try{

        const {email,password }= req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message : 'Doctor does not exist'})
        }
        
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor_id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message : 'Invalid Credentials'})

        }

    }catch{
        console.log(err)
        res.json({success:false,message:err.message})

    }
}

export {changeAvailability,doctorList,loginDoctor}