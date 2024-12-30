import mongoose from 'mongoose';

const { Schema, Model } = mongoose

// Main user schema
const mentorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    }, 
    noOfSessions: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Mentor = Model('Mentor', mentorSchema);
export default Mentor; 
