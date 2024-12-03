import express from 'express';
import bodyParser from 'body-parser';
import userPreferencesRoutes from './api-routes/userPreferences.js';
import './workers/notification.js';

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Health check endpoint
app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// User Preferences API routes
app.use('/preferences', userPreferencesRoutes);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
