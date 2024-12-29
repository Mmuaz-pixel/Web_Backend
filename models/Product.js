import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameUrdu: { type: String },
  description: { type: String, required: true },
  descriptionUrdu: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ['handicrafts', 'textiles', 'food', 'agriculture'], required: true },
  stock: { type: String, required: true },
  images: [{ type: String }],
  seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, { timestamps: true });

export default mongoose.model('Product', productSchema);