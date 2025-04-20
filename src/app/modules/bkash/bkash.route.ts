import express from 'express';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BkashController } from './bkash.controller';

const router = express.Router();

router.post(
  '/create-payment',
  auth(USER_ROLE.admin, USER_ROLE.instructor, USER_ROLE.user),
  BkashController.createPayment,
);
router.get('/callback', BkashController.callbackPayment);
router.get('/query-payment/:paymentID', BkashController.queryPayment);

router.get('/refund-payment/:trxID', BkashController.refundPayment);

export const BkashRoutes = router;
