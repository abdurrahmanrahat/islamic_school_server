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

router.get('/', UserControllers.getAllUsers);

router.get('/current-user/:email', UserControllers.getCurrentUserByEmail);

router.patch(
  '/:userId',
  ValidateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.delete('/:userId', UserControllers.deleteUser);

export const UserRoutes = router;
