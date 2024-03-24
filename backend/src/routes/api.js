import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

export default api;
