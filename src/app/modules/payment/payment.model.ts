import mongoose, { model } from 'mongoose';
import { TPayment } from './payment.interface';

const PaymentSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    amount: { type: Number, required: true },
    trxID: { type: String, unique: true, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    callBackUrl: { type: String },
  },
  { timestamps: true },
);

// model
export const Payment = model<TPayment>('Payment', PaymentSchema);
