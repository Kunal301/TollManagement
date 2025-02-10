import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import transactionRoutes from './routes/transactions.js';
import dashboardRoutes from './routes/dashboard.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import compression from 'compression';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI,{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // w: 'majority',
  // retryWrites: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  console.log('Database Name:', mongoose.connection.db.databaseName);
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
  
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
// Add this route to your server.js file
app.post('/api/test', async (req, res) => {
  try {
    // This will create a test collection and document
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: 'data', timestamp: new Date() });
    
    res.json({ 
      message: 'Database connection successful', 
      database: mongoose.connection.db.databaseName 
    });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({ error: error.message });
  }
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