import express from 'express';
import cors from 'cors';
import connectDB from './utility/connectDB.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

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

  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(limiter); 
  app.use(morgan('combined'));
  connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}