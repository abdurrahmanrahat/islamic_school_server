import express from 'express';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post('/pay', PaymentControllers.initiatePayment);

router.post('/execute', PaymentControllers.executePayment);

export const PaymentRoutes = router;

//
