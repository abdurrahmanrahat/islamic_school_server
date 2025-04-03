import { z } from 'zod';

const createPaymentValidationSchema = z.object({
  body: z.object({
    paymentID: z.string().min(1, 'Payment ID is required'),
    trxID: z.string().min(1, 'Transaction ID is required'),
    amount: z.string().min(1, 'Amount is required'),
    paymentExecuteTime: z.string().min(1, 'Payment execution time is required'),
    payerAccount: z.string().min(1, 'Payer account is required'),
    isRefund: z.boolean().optional(),
  }),
});

const updatePaymentValidationSchema = z.object({
  body: z.object({
    paymentID: z.string().optional(),
    trxID: z.string().optional(),
    amount: z.string().optional(),
    paymentExecuteTime: z.string().optional(),
    payerAccount: z.string().optional(),
    isRefund: z.boolean().optional(),
  }),
});

export const PaymentValidations = {
  createPaymentValidationSchema,
  updatePaymentValidationSchema,
};
