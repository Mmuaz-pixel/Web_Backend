
import Order from '../models/Order.js';

// Create Order
export const createOrder = async (req, res) => {
  try {
    console.log(req.body); 
    const order = new Order({ user: req.user._id, ...req.body });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get Seller Orders
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id; // Assuming `req.user._id` contains the seller's ID

    const orders = await Order.find({ 'products.seller': sellerId })
      .populate('products.product') 
      .populate('buyer') 
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if(order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
