import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Subschema for businessDetails
const businessDetailsSchema = new Schema({
  businessName: {
    type: String,
    required: function () {
      return this.role === 'seller'; // Required only for sellers
    },
  },
  businessType: {
    type: String,
    enum: ['handicrafts', 'textiles', 'food', 'other'],
    required: function () {
      return this.role === 'seller'; // Required only for sellers
    },
  },
});

// Main user schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'mentor', 'ngo'],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    businessDetails: {
      type: businessDetailsSchema, // Reference the subschema
      default: null, // Allows it to be null for non-sellers
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
