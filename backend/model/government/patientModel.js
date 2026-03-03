import mongoose, { mongo } from "mongoose";

const reportSchema = new mongoose.Schema({
    doctorId:{
        type:String,required:true
    },
    date:{
        type:Date,required:true , default:Date.now
    },
    age:{
        type:Number, required :true,
    },
    symptom:{
        type:String,required:true,default:""
    },
    prescription:{
        type:String,required:true,
    },
    addtionalNote:{
        type:String,required:true,default:""
    },
    additonalTests:{
        type:String,required:true,default:""
    },
    nextVisitSchedule:{
        type:Date,required:true,
    }
})

const patientSchema = new mongoose.Schema({
    patientId:{
        type:String, required :true,//which should be equal to appointment
    },
    report:[reportSchema],required:true,default:[],
    isCompleted:{
        type:Boolean,required:true,default:false,
    },
},{minimize:false})

const patientModel = mongoose.models.patientModel || mongoose.model("patients",patientSchema)

export default patientModel;

