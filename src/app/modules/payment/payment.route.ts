import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { PaymentControllers } from './payment.controller';
import { PaymentValidations } from './payment.validation';

const router = express.Router();

router.post(
  '/create-payment',
  ValidateRequest(PaymentValidations.createPaymentValidationSchema),
  PaymentControllers.createPayment,
);

router.get('/', PaymentControllers.getAllPayments);
router.get('/:paymentID', PaymentControllers.getSinglePayment);

router.patch(
  '/:paymentID',
  ValidateRequest(PaymentValidations.updatePaymentValidationSchema),
  PaymentControllers.updatePayment,
);

router.delete('/:paymentID', PaymentControllers.deletePayment);

export const PaymentRoutes = router;
