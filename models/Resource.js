import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  category: { type: String },
  language: { type: String },
  filePath: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema);
