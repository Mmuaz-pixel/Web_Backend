// Analytics Route
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getSalesAnalytics = async(req, res) => {
  try {
    const { timeRange } = req.query;

    // Validate time range
    const validTimeRanges = ['week', 'month', 'year'];
    if (!timeRange || !validTimeRanges.includes(timeRange)) {
      return res.status(400).json({ message: 'Invalid time range' });
    }

    // Calculate the date filter based on time range
    const now = new Date();
    let startDate;
    if (timeRange === 'week') {
      startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (timeRange === 'month') {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
    } else if (timeRange === 'year') {
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
    }

    // Fetch orders within the time range
    const orders = await Order.find({ createdAt: { $gte: startDate } }).populate('products.product buyer');

    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.products.reduce((productSum, product) => productSum + (product.product.price * product.quantity), 0);
    }, 0);

    const totalOrders = orders.length;

    const uniqueBuyers = new Set(orders.map(order => order.buyer._id.toString()));
    const totalCustomers = uniqueBuyers.size;

    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    const stats = {
      totalRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
    };

    // Sales Data
    const salesData = orders.reduce((acc, order) => {
      const date = order.createdAt.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      if (!acc[date]) {
        acc[date] = { sales: 0, orders: 0 };
      }
      acc[date].sales += order.products.reduce((sum, product) => sum + (product.product.price * product.quantity), 0);
      acc[date].orders += 1;
      return acc;
    }, {});

    const salesDataArray = Object.keys(salesData).map(date => ({
      date,
      sales: salesData[date].sales,
      orders: salesData[date].orders,
    }));

    // Product Performance
    const productPerformance = await Product.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'products.product',
          as: 'orderData',
        },
      },
      { $unwind: '$orderData' },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          revenue: {
            $sum: {
              $multiply: ['$price', '$orderData.products.quantity'],
            },
          },
          sales: { $sum: '$orderData.products.quantity' },
        },
      },
    ]);

    // Customer Locations
    const customerLocations = orders.reduce((acc, order) => {
      const location = order.buyer.location || 'Unknown';
      if (!acc[location]) {
        acc[location] = 0;
      }
      acc[location] += 1;
      return acc;
    }, {});

    const customerLocationsArray = Object.keys(customerLocations).map(location => ({
      name: location,
      value: customerLocations[location],
    }));

    // Response
    res.status(200).json({
      stats,
      salesData: salesDataArray,
      productPerformance,
      customerLocations: customerLocationsArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const getTrainingAnalytics = async (req, res) => {
  try {
    const analytics = {}; // todo 
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
