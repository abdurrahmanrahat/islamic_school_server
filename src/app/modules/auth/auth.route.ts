import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);

router.get('/google', AuthControllers.googleLogin);

export const AuthRoutes = router;
