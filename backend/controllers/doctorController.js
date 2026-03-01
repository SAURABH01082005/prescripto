
import doctorModel from "../model/doctorModel.js"

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

export {changeAvailability,doctorList}