import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    doctorId: {
        type: String, required: true
    },
    date: {
        type: Date, required: true, default: Date.now
    },
    symptom: {
        type: String, required: true, default: ""
    },
    prescription: {
        type: String, required: true,
    },
    addtionalNote: {
        type: String, required: true, default: ""
    },
    additonalTests: {
        type: String, required: true, default: ""
    },
    nextVisitSchedule: {
        type: Date, required: true,
    }
})

const patientSchema = new mongoose.Schema({
    patientDetails: {
        type: {
            uniqueGovId: {
                type: String, required:true //userid + hospialid
            },
            uniqueGovAppointmentId: {
                type: String, required:true,unique:true//appointment id + hospital id
            },
            name: {
                type: String, required: true,
            },
            dob: {
                type: Date, required: true,
            },
            address: {
                type: {
                    line1: {
                        type: String,
                    },
                    line2: {
                        type: String,
                    }
                }, required: true,
            },
            image: {
                type: String, required: true
            },
            phone: {
                type: Number, required: true
            },
            gender: {
                type: String, required: true
            },
        }
    },

    reference: {
        type: [{
            hospitalId: {
                type: String, required: true,
            },
            docId: {
                type: String, required: true,
            },
            patientId: {
                type: String, required: true,
            },
            date: {
                type: Date,  default: Date.now,
            },
            reason: {
                type: String, required: true,
            }

        }],

    },


    report: {
        type: [reportSchema],

    },
    isCompleted: {
        type: Boolean, required: true, default: false,
    },
}, { minimize: false })



const patientModel = mongoose.models.patientModel || mongoose.model("patientsregisteredbygovernment", patientSchema)

export default patientModel;

