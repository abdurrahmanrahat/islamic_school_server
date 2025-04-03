import express from 'express';
import { BkashController } from './bkash.controller';

const router = express.Router();

router.post('/create-payment', BkashController.createPayment);
router.get('/callback', BkashController.callbackPayment);
router.get('/query-payment/:paymentID', BkashController.queryPayment);

router.get('/refund-payment/:trxID', BkashController.refundPayment);

export const BkashRoutes = router;
