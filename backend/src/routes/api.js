import express from 'express';
import { register, login } from '../controllers/authController.js';
const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);

export default api;
