import Product from '../models/Product.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const { category, search, priceMin, priceMax, sort, page = 1, limit = 10 } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (search) filters.name = new RegExp(search, 'i');
    if (priceMin) filters.price = { ...filters.price, $gte: priceMin };
    if (priceMax) filters.price = { ...filters.price, $lte: priceMax };

    const products = await Product.find(filters)
      .sort(sort || 'createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('seller');

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const { category, search, priceMin, priceMax, sort, page = 1, limit = 10 } = req.query;
    const filters = { seller: req.user.id };
    if (category) filters.category = category;
    if (search) filters.name = new RegExp(search, 'i');
    if (priceMin) filters.price = { ...filters.price, $gte: priceMin };
    if (priceMax) filters.price = { ...filters.price, $lte: priceMax };

    const products = await Product.find(filters)
      .sort(sort || 'createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

