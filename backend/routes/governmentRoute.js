import express from "express";
import authGovernment from "../middlewares/authGovernment.js";
import {getBedsBySpeciality,setBedsBySpeciality,addPatient,addPatientReport,getSpecialitiesAvailable, getHospitalDetails} from '../controllers/doctorController.js'

const governmentRouter=express.Router();

governmentRouter.get("/resources/bed/gedata/speciality",authGovernment,getBedsBySpeciality)
governmentRouter.post("/resources/bed/setdata/speciality",authGovernment,setBedsBySpeciality)
governmentRouter.post("/addpatient",authGovernment,addPatient)
governmentRouter.post("/addpatient/report",authGovernment,addPatientReport)
governmentRouter.get("/specialities-available",authGovernment,getSpecialitiesAvailable)
governmentRouter.get("/hospital-details",authGovernment,getHospitalDetails)



export default doctorRouter;