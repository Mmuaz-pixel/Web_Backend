import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  level: { type: String },
  language: { type: String },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);

