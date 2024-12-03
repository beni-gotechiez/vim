import express from 'express';
import controller from '../controllers/userPreferences.js';

const router = express.Router();

// Routes for managing user preferences
router.post('/send-notification', controller.sendNotification); // Send a notification based on preferences
router.put('/', controller.editUserPreferences); // Edit existing preferences
router.post('/', controller.createUserPreferences); // Create new preferences

export default router;
