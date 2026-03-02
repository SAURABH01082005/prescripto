
import bcrypt from "bcryptjs"
import doctorModel from "../model/doctorModel.js"
import decrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../model/appointmentModel.js"

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
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message : 'Invalid Credentials'})

        }

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}

//api to get doctor appointments for doctor panel

const appointmentsDoctor = async (req,res)=>{
    try{
        const docId = req.docId
        const appointments = await appointmentModel.find({docId})
        res.json({success:true, appointments})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }

}

//api to mark appointment completed for doctor panel
const appointmentComplete = async (req,res)=>{
    try{
        const docId= req.docId
        const {appointmentId} = req.body
        
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId===docId){
             await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            
            return res.json({success:true,message:"Appointment Completed"})

        }else{
            return res.json({success:false,message:"Mark Failed"})
        }

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}


//api to cancle appointment form doctor panel
const appointmentCancel = async (req,res)=>{
    try{
        const docId= req.docId
        const {appointmentId} = req.body
        
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId===docId){

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:"Appointment Cancelled"})

        }else{
            return res.json({success:false,message:"Cancellation Failed"})
        }

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}

//api to get dashboard data for doctor panel

const doctorDashboard = async (req,res)=>{
    try{
        const docId = req.docId
        const appointments = await appointmentModel.find({docId})

        let earnings =0;

        appointments.map((item)=>{
            if(item.isCompleted || item.payment)
                earnings+=item.amount
        })

        let patients = []

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings:earnings,
            appointments:appointments.length,
            patients: patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true ,dashData})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}

//api to get doctor profile
const doctorProfile = async (req,res)=>{
    try{

        const docId = req.docId
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({success:true,profileData})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}

//api to update doctor profile from doctor panel
const updateDoctorProfile = async (req,res)=>{
    try{

        const docId= req.docId

        const {fees,address,available} = req.body
        console.log("address is : ",address)

        const {data}=await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        
        res.json({success:true,message:"Profile Updated"})
        


    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})

    }
}
export {changeAvailability,
    doctorList,loginDoctor,
    appointmentsDoctor,appointmentComplete,
    appointmentCancel,doctorDashboard,
    doctorProfile,updateDoctorProfile}