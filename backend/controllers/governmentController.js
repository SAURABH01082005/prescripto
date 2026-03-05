import doctorModel from '../model/doctorModel.js'
import bedModel from '../model/government/bedModel.js'
import patientModel from '../model/government/patientModel.js'
import axios from 'axios'
import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'


const getPatientCredentials = async (req, res) => {
    try {
        // console.log("getPatientCredentials called")
        const { email, password } = req.body
        const data = await userModel.findOne({ email })
        if (!data) {
            return res.json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, data.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Hospital Credentials" })
        }


        const patientData = await patientModel.findOne({ "patientDetails.uniqueGovId": data._id.toString() + process.env.HOSPITAL_ID }).select("patientDetails.uniqueGovId")

        if (!patientData) {
            return res.json({ success: false, message: "Patient is not Registered by Hospital yet" })
        }

        res.json({ success: true, uniqueGovPatientId: patientData.patientDetails.uniqueGovId })
        console.log("Patient Credentials sent successfully")

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message + " : error from hospital module")
    }
}

const getDoctorCredentials = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await doctorModel.findOne({ email })
        if (!data) {
            return res.json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, data.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Hospital Credentials" })
        }

        res.json({ success: true, uniqueGovDoctorId: data._id.toString() + process.env.HOSPITAL_ID, name: data.name })

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message + " : error from hospital module")
    }
}


const getBedsBySpeciality = async (req, res) => {
    try {
        const { speciality } = req.body

        const bedData = await bedModel.find({ speciality })

        res.json({ success: true, bedData })
    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }

}
const setBedsBySpeciality = async (req, res) => {
    try {
        const { engageSchedule, patientId, speciality } = req.body

        const bedData = await bedModel.findOneAndUpdate({ speciality, available: true }, { available: false, engageSchedule, patientId })

        if (bedData.success) {
            res.json({ success: true, message: "Bed Assigned Successfully" })

        } else {
            res.json({ success: false, message: bedData.message })
        }



    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }

}

const addBeds = async (req, res) => {
    try {

        const { bedType, bedNumber, engageSchedule, patientId, speciality } = req.body

        const data = await bedModel.create({ bedType, bedNumber, engageSchedule, patientId, speciality, availablity: false })

        if (data.success) {
            res.json({ success: true, message: "Bed Added Successfully" })

        } else {
            res.json({ success: false, message: bedData.message })
        }

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }
}

const addPatient = async (req, res) => {
    try {
        const { patientDetails, reference } = req.body

        const data = await patientModel.create({ patientDetails, reference })

        res.json({ success: true, message: "Patient Added successfully" })

    } catch (err) {
        res.json({ success: false, message: err.message+"999999999999999999999" })
        console.log(err.message)
    }
}

const addPatientReport = async (req, res) => {
    try {
        const { report, uniqueGovId } = req.body

        const data = await patientModel.findOneAndUpdate({ 'patientDetails.uniqueGovId': uniqueGovId }, { $push: { report: report } }, { new: true })

        if (data.success) {
            res.json({ success: true, message: "Patient Report Added Successfully" })

        } else {
            res.json({ success: false, message: data.message })
        }

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }
}

const getSpecialitiesAvailable = async (req, res) => {
    try {
        const specialities = await doctorModel.distinct(speciality, { available: true })//array of strings
        res.json({ success: true, specialities })
    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }
}

//get hospital details

const getHospitalDetails = async (req, res) => {
    try {
        const hospitalName = process.env.HOSPITAL_NAME
        const hospitalStreet = process.env.HOSPITAL_STREET
        const hospitalCity = process.env.HOSPITAL_CITY
        const hospitalState = process.env.HOSPITAL_STATE
        const hospitalPincode = process.env.HOSPITAL_PINCODE
        const address = {
            hospitalName, hospitalPincode, hospitalState, hospitalStreet, hospitalCity
        }
        res.json({ success: true, address })

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }
}

const getDocId = async (req, res) => {
    const docId = req.docId
    res.json({ success: true, docId })

}

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        res.json({ success: true, userData })
    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }

}
const getPatientDetails = async (req, res) => {
    try {
        const { patientAppointmentId } = req.body
        const patientData = await  patientModel.find({'patientDetails.uniqueGovAppointmentId':patientAppointmentId})
        if(patientData.length >0)
        return res.json({ success: false, message: "Patient Already Registered for this Appointment" })
        res.json({ success: true, patientData })
    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }

}
export {getPatientDetails, getUserDetails, getDocId, getBedsBySpeciality, setBedsBySpeciality, addPatient, addPatientReport, getSpecialitiesAvailable, getHospitalDetails, addBeds, getPatientCredentials, getDoctorCredentials }