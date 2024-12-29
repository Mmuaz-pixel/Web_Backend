import express from 'express';
import cors from 'cors';
import connectDB from './utility/connectDB.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const PORT = process.env.PORT || 5000;

export default function (app) {

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  app.use(express.json());
  app.use(helmet());
  app.use(limiter); 
  app.use(morgan('combined'));
  app.use(cookieParser());
  connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}