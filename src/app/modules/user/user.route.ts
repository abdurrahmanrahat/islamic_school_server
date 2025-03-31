import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  ValidateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/current-user/:email', UserControllers.getCurrentUserByEmail);

export const UserRoutes = router;
