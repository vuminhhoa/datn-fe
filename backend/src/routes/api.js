import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import { updateProfile, getOneUser } from '../controllers/userController.js';
import { getRole, getSettings } from '../controllers/settingsController.js';
import {
  updateBidding,
  getOneBidding,
  createBidding,
  getListBiddings,
} from '../controllers/biddingController.js';
const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

api.post('/profile/edit', updateProfile);

api.get('/settings', getSettings);
api.get('/settings/role/:id', getRole);

api.get('/bidding', getOneBidding);
api.post('/bidding', createBidding);
api.get('/biddings', getListBiddings);
api.post('/bidding/:id', updateBidding);

api.get('/user/:id', getOneUser);

export default api;
