import express from "express";
import authGovernment from "../middlewares/authGovernment.js";
import {getPatientDetails,getUserDetails,getDocId,getBedsBySpeciality,setBedsBySpeciality,addPatient,addPatientReport,getSpecialitiesAvailable, getHospitalDetails,addBeds,getPatientCredentials,getDoctorCredentials} from '../controllers/governmentController.js'
import authDoctor from "../middlewares/authDoctor.js";

const governmentRouter=express.Router();

governmentRouter.get("/",(req,res)=>{ res.json({success:true,message:"this server is working!"})})
governmentRouter.post("/patient-credentials",authGovernment,getPatientCredentials)//outside of website 
governmentRouter.post("/doctor-credentials",authGovernment,getDoctorCredentials)//outside of website
governmentRouter.get("/get-docid",authDoctor,getDocId)//inside of website
governmentRouter.post("/add-patient",authDoctor,addPatient)// inside of webiste
governmentRouter.post("/get-userdetails",authDoctor,getUserDetails)// inside of webiste
governmentRouter.post("/get-patientdetails",authDoctor,getPatientDetails)// inside of webiste



governmentRouter.get("/resources/bed/getdata/speciality",authGovernment,getBedsBySpeciality)
governmentRouter.post("/resources/bed/setdata/speciality",authGovernment,setBedsBySpeciality)
governmentRouter.post("/addbeds",authGovernment,addBeds)
governmentRouter.post("/addpatient/report",authGovernment,addPatientReport)
governmentRouter.get("/specialities-available",authGovernment,getSpecialitiesAvailable)
governmentRouter.get("/hospital-details",authGovernment,getHospitalDetails)




export default governmentRouter;