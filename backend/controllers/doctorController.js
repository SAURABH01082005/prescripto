
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

export {changeAvailability}