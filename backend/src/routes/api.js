import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import {
  updateProfile,
  getOneUser,
  getListUsers,
  deleteUser,
} from '../controllers/userController.js';
import {
  getRole,
  getSettings,
  getRoles,
} from '../controllers/settingsController.js';
import {
  updateBidding,
  getOneBidding,
  createBidding,
  getListBiddings,
  deleteBidding,
} from '../controllers/biddingController.js';
const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

api.post('/profile/edit', updateProfile);

api.get('/settings', getSettings);
api.get('/settings/role/:id', getRole);
api.get('/settings/roles', getRoles);

api.post('/bidding', createBidding);
api.get('/biddings', getListBiddings);
api.get('/bidding/:id', getOneBidding);
api.post('/bidding/:id', updateBidding);
api.delete('/bidding/:id', deleteBidding);

api.get('/user/:id', getOneUser);
api.delete('/user/:id', deleteUser);
api.get('/users', getListUsers);

export default api;
