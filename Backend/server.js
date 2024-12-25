import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import tollRoutes from './routes/tollPlazas.js';
// import userRoutes from './routes/users.js';
import transactionRoutes from './routes/transactions.js';
import dashboardRoutes from './routes/dashboard.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Toll Management System API',
    version: '1.0.0',
    endpoints: {
    //   users: '/api/users',
      tolls: '/api/tolls',
      transactions: '/api/transactions'
    }
  });
});

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api/tolls', tollRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});