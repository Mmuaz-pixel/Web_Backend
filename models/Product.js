// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameUrdu: { type: String },
  description: { type: String, required: true },
  descriptionUrdu: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Product', productSchema);