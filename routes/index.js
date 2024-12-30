import e from "express";
import { login, register } from "../controllers/AuthController.js";
import { createProduct, deleteProduct, getProductById, getProducts, getMyProducts, updateProduct } from "../controllers/ProductController.js";
import { getCategories } from "../controllers/CategoryController.js";
import { createOrder, getOrderById, getSellerOrders, getUserOrders, updateOrderStatus } from "../controllers/OrderController.js";
import { enrollInCourse, getCourseById, getCourses } from "../controllers/CourseController.js";
import { getUserProgress, updateProgress } from "../controllers/ProgressController.js";
import { downloadResource, getResources, uploadResource } from "../controllers/ResourceController.js";
import { addComment, createPost, getPostById, getPosts } from "../controllers/PostController.js";
import { createEvent, getEvents, updateEvent } from "../controllers/EventController.js";
import { getNotifications, markNotificationAsRead } from "../controllers/NotificationController.js";
import { uploadFile } from "../controllers/FileController.js";
import { getSalesAnalytics, getTrainingAnalytics } from "../controllers/AnalyticsController.js";
import protect from "../utility/protect.js";
import cacheMiddleware from "../utility/cacheMiddleware.js";

const router = e.Router();

// Auth Routes 
router.post('/users/login', login);
router.post('/users/register', register);

// Products Routes
router.post('/products', protect, createProduct);
router.get('/products', protect, getProducts);
router.get('/my-products', protect, getMyProducts);
router.get('/products/:id', protect, getProductById);
router.patch('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, deleteProduct);

// Category Routes
router.get('/categories', getCategories);

// Order Routes
router.post('/orders', protect, createOrder);
router.get('/user-orders', protect, getUserOrders);
router.get('/seller-orders', protect, getSellerOrders);
router.get('/order/:id', protect, getOrderById);
router.patch('/orders/:id/status', protect, updateOrderStatus);

// Shop Routes
// router.get('/shops/:id', );
// router.patch('/shops/:id', );

// Courses Routes 
router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.post('/courses/enroll', protect, enrollInCourse);

// Progress Routes
router.get('/progress', protect, getUserProgress);
router.post('/progress/update', protect, updateProgress);

// Resources Routes
router.get('/resources', getResources);
router.post('/resources', protect, uploadResource);
router.get('/resources/:id/download', protect, downloadResource);

// Community Routes
router.get('/community/posts', getPosts);
router.get('/community/posts/:id', getPostById);
router.post('/community/posts', protect, createPost);
router.post('/community/posts/:id/comments', protect, addComment);

// Events Routes
router.get('/events', getEvents);
router.post('/events', protect, createEvent);
router.patch('/events/:id', protect, updateEvent);

// Notifications Routes
router.get('/notifications', protect, getNotifications);
router.patch('/notifications/:id', protect, markNotificationAsRead);

// Files Upload Routes
router.post('/upload', uploadFile);

// Analytics Routes
router.get('/analytics/sales', protect, getSalesAnalytics);
router.get('/analytics/training', protect, getTrainingAnalytics);


export default router; 