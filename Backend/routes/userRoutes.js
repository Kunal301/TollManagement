import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(requireAuth); // Apply authentication middleware to all routes in this file

router.get('/', requireRole(['admin']), getAllUsers);
router.patch('/:id/role', requireRole(['admin']), updateUserRole);

export default router;