import express from 'express';
import { register } from '../controllers/authController.js';
const api = express.Router();

api.post('/auth/login', register);

export default api;
