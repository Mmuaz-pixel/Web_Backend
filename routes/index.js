import e from "express";
import { login, register } from "../controllers/AuthController";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/ProductController";
import { getCategories } from "../controllers/CategoryController";
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from "../controllers/OrderController";
import { enrollInCourse, getCourseById, getCourses } from "../controllers/CourseController";
import { getUserProgress, updateProgress } from "../controllers/ProgressController";
import { downloadResource, getResources, uploadResource } from "../controllers/ResourceController";
import { addComment, createPost, getPostById, getPosts } from "../controllers/PostController";
import { createEvent, getEvents, updateEvent } from "../controllers/EventController";
import { getNotifications, markNotificationAsRead } from "../controllers/NotificationController";
import { uploadFile } from "../controllers/FileController";
import { getSalesAnalytics, getTrainingAnalytics } from "../controllers/AnalyticsController";
import protect from "../utility/protect";

const router = e.Router();

// Auth Routes 
router.post('/auth/login', login);
router.post('/auth/register', register);

// Products Routes
router.post('/products', protect, createProduct);
router.get('/products', protect, getProducts);
router.get('/products/:id', protect, getProductById);
router.patch('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, deleteProduct);

// Category Routes
router.get('/categories', getCategories);

// Order Routes
router.post('/orders', protect, createOrder);
router.get('/orders', protect, getUserOrders);
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
router.get('/api/events', getEvents);
router.post('/api/events', protect, createEvent);
router.patch('/api/events/:id', protect, updateEvent);

// Notifications Routes
router.get('/api/notifications', protect, getNotifications);
router.patch('/api/notifications/:id', protect, markNotificationAsRead);

// Files Upload Routes
router.post('/api/upload', uploadFile);

// Analytics Routes
router.get('/api/analytics/sales', protect, getSalesAnalytics);
router.get('/api/analytics/training', protect, getTrainingAnalytics);


export default router; 