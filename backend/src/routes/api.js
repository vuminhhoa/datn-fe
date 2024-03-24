import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import { updateProfile } from '../controllers/userController.js';
import { getSettings } from '../controllers/settingsController.js';

const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

api.post('/profile/edit', updateProfile);

api.get('/settings', getSettings);

export default api;
