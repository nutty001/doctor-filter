import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});


const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
