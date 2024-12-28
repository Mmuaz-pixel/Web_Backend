import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  fullName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'mentor', 'ngo'],
    required: true
  },  
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  location: {
    type: String,
    required: true
  },
  businessDetails: {
    type: String, 
    nullable: true
  }
}, { timestamps: true });

const User = model('User', userSchema);

export default User;