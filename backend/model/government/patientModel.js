import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
   patientDetail: {//which should be equal to appointment

        name: {
            type: String, required: true,
        },
        image: {
            type: String, required: true,
        },

        dob: {
            type: Date, required: true,
        },
        address: {
            type: {
                line1: {
                    type: String, required: true,
                },
                line2: {
                    type: String ,
                },
            },
            required: true
        },
    },
    detail: {
        type: {
            hospitalId: { type: String, required: true },
            appointmentId: { type: String, required: true },
            userId: { type: String, required: true },
            docId:{type:String,required:true}
        },
        required: true

    },

   
}, { minimize: false })



const patientModel = mongoose.models.patientModel || mongoose.model("patientsregisteredtogovernment", patientSchema)

export default patientModel;

