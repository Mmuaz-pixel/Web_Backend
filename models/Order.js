import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // Price at the time of purchase
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  }],
  shipping: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    notes: { type: String },
  },
  payment: {
    method: { type: String, enum: ['card', 'cash', 'bank_transfer'], required: true },
    total: { type: Number, required: true },
    cardDetails: {
      cardNumber: { type: String },
      expiryDate: { type: String },
      cvv: { type: String },
      nameOnCard: { type: String },
    },
  },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
