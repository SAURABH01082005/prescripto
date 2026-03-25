import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    bedType:{
        type:String,required:true
    },
    bedId:{
        type:String, required:true,
    },
    speciality:{
        type:String,required:true,
    },
    available:{
        type:Boolean,default:true,required:true,
    },
    patientId:{
        type:String ,required:true,default  :"",

    },
    engageSchedule:{
        type:Object,required:true,default:{assignDate:"",dispatchDate:"",},
    }
},{minimize:false})

const bedModel =mongoose.models.bedModel || mongoose.model("beds",bedSchema)// if doctor modlel is not present; prevent multiple moment

export default bedModel