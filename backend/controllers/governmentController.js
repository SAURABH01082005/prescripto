import bedModel from '../model/government/bedModel'
import patientModel from '../model/government/patientModel'

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
        const { patientId } = req.body

        const data = await patientModel.create({ patientId })
        if (data.success) {
            res.json({ success: true, message: "Patient Added Successfully" })

        } else {
            res.json({ success: false, message: data.message })
        }

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }
}

const addPatientReport = async (req, res) => {
    try {
        const { report, patientId } = req.body

        const data = await patientModel.findOneAndUpdate({ patientId }, { $push: { report: { report } } }, { new: true })

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

export { getBedsBySpeciality, setBedsBySpeciality,addPatient,addPatientReport }