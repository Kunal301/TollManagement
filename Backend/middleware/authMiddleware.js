import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import redis from "redis";

const client = redis.createClient();
client.on("error", (err) => console.error("Redis Error:", err));


export const requireAuth = async (req, res, next) => {
  try {
    // Check for the token in the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    // Check if user data is cached
    client.get(token, async (err, userData) => {
      if (userData) {
        req.user = JSON.parse(userData);
        return next();
      }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: "User not found" });

      client.setEx(token, 3600, JSON.stringify(user)); // Cache user for 1 hour
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};