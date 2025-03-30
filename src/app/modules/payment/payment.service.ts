import axios from 'axios';
import config from '../../config';
import { getBkashToken } from '../../utils/getBkashToken';
import { Payment } from './payment.model';

const BKASH_BASE_URL = config.bkash_checkout_base_url;
const NAGAD_BASE_URL = config.nogod_base_url;

// Initiate Payment for bKash
const initiateBkashPayment = async (
  amount: number,
  userID: string,
  callBackUrl: string,
) => {
  const token = await getBkashToken();

  console.log('token', token);

  const response = await axios.post(
    `${BKASH_BASE_URL}/checkout/payment/create`,
    {
      mode: '0011',
      payerReference: userID,
      amount: Number(amount.toFixed(2)),
      currency: 'BDT',
      intent: 'sale',
      merchantInvoiceNumber: `INV${Date.now()}`,
      callbackURL: callBackUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add 'Bearer' if needed
        'Content-Type': 'application/json', // Add this header just in case
      },
    },
  );

  return response.data.bkashURL;
};

// Execute Payment for bKash
const executeBkashPayment = async (paymentID: string, userID: string) => {
  const token = await getBkashToken();

  const response = await axios.post(
    `${BKASH_BASE_URL}/checkout/payment/execute`,
    { paymentID },
    { headers: { Authorization: token } },
  );

  const transactionData = response.data;
  if (!transactionData.trxID) throw new Error('Payment verification failed');

  const newPayment = await Payment.create({
    userID,
    amount: transactionData.amount,
    trxID: transactionData.trxID,
    paymentMethod: 'bkash',
    status: 'Completed',
  });

  return newPayment;
};

// ✅ Handle Nagad Payment
export const initiateNagadPayment = async (amount: number, userID: string) => {
  const response = await axios.post(`${NAGAD_BASE_URL}/checkout/initiate`, {
    merchantId: process.env.NAGAD_MERCHANT_ID,
    amount,
    callbackURL: process.env.NAGAD_CALLBACK_URL,
    customerMobile: userID,
  });

  return response.data.paymentURL;
};

export const PaymentServices = {
  initiateBkashPayment,
  executeBkashPayment,
  initiateNagadPayment,
};
