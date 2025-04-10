import axios from 'axios';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Payment } from '../payment/payment.model';
import { BkashToken } from './bkash.model';

const BKASH_BASE_URL = config.bkash_checkout_base_url;
const APP_KEY = config.bkash_checkout_app_key;
const APP_SECRET = config.bkash_checkout_app_secret;
const USERNAME = config.bkash_checkout_username;
const PASSWORD = config.bkash_checkout_password;

// Get a Valid Token (Grant or Refresh)
const getValidToken = async (): Promise<string> => {
  const tokenData = await BkashToken.findOne();

  if (!tokenData) {
    return await generateNewToken();
  }

  // If grant_token is still valid, return it
  if (new Date(tokenData.grantExpiresAt) > new Date()) {
    return tokenData.grantToken;
  }
  // If refresh_token is valid, use it to get a new grant_token
  if (new Date(tokenData.refreshExpiresAt) > new Date()) {
    return await useRefreshToken(tokenData.refreshToken);
  }

  // If both expired, generate a new grant_token
  return await generateNewToken();
};

// Generate a New Grant Token
const generateNewToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${BKASH_BASE_URL}/tokenized/checkout/token/grant`,
      {
        app_key: APP_KEY,
        app_secret: APP_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          username: USERNAME as string,
          password: PASSWORD as string,
        },
      },
    );

    if (!response.data.id_token) throw new Error('Failed to get grant token');

    const { id_token, refresh_token, expires_in } = response.data;

    const grantExpiresAt = new Date(Date.now() + expires_in * 1000);
    const refreshExpiresAt = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); // 28 days expiry

    await BkashToken.findOneAndUpdate(
      {},
      {
        grantToken: id_token,
        refreshToken: refresh_token,
        grantExpiresAt,
        refreshExpiresAt,
      },
      { upsert: true },
    );

    return id_token;
  } catch (error: any) {
    // console.error('Error generating bKash token:', error.message);
    throw new Error('Could not generate new bKash token');
  }
};

// Use Refresh Token to Get New Grant Token
const useRefreshToken = async (refreshToken: string): Promise<string> => {
  const response = await axios.post(
    `${BKASH_BASE_URL}/tokenized/checkout/token/refresh`,
    {
      app_key: APP_KEY,
      app_secret: APP_SECRET,
      refresh_token: refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        username: USERNAME as string,
        password: PASSWORD as string,
      },
    },
  );

  const { id_token, expires_in } = response.data;

  const grantExpiresAt = new Date(Date.now() + expires_in * 1000);

  await BkashToken.findOneAndUpdate(
    {},
    { grantToken: id_token, grantExpiresAt },
  );

  return id_token;
};

// Create Payment
const createPayment = async (
  amount: number,
  orderId: string,
  paymentForId: string,
  paymentSuccessURL: string,
  paymentFailedURL: string,
) => {
  const token = await getValidToken();

  const payload = {
    mode: '0011',
    payerReference: ' ',
    callbackURL: `${config.backed_live_url}/bkash/callback?paymentForId=${paymentForId}&paymentSuccessURL=${paymentSuccessURL}&paymentFailedURL=${paymentFailedURL}&amount=${amount}`,
    merchantAssociationInfo: 'MI05MID54RF09123456One',
    amount: amount,
    currency: 'BDT',
    intent: 'sale',
    merchantInvoiceNumber: `INV-${orderId}`,
  };

  const response = await axios.post(
    `${BKASH_BASE_URL}/tokenized/checkout/create`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        'x-app-key': APP_KEY,
      },
    },
  );

  return response.data;
};

// Execute Payment
const callbackPayment = async (paymentID: string) => {
  const token = await getValidToken();

  const response = await axios.post(
    `${BKASH_BASE_URL}/tokenized/checkout/execute`,
    { paymentID },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        'x-app-key': APP_KEY,
      },
    },
  );

  // TODO: database action here
  const paymentInfo = {
    paymentID: response.data.paymentID,
    trxID: response.data.trxID,
    amount: response.data.amount,
    paymentExecuteTime: response.data.paymentExecuteTime,
    payerAccount: response.data.payerAccount,
    isRefund: false,
  };

  await Payment.create(paymentInfo);

  return response.data;
};

// Query Payment Status
const queryPayment = async (paymentID: string) => {
  const token = await getValidToken();

  const response = await axios.post(
    `${BKASH_BASE_URL}/tokenized/checkout/payment/status`,
    { paymentID },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
        'x-app-key': APP_KEY,
      },
    },
  );

  return response.data;
};

//! TODO: REFUND
// Refund Payment
const refundPayment = async (trxID: string) => {
  const token = await getValidToken();
  console.log(token);

  const paymentData = await Payment.findOne({ trxID });
  console.log('paymentData', paymentData);

  if (!paymentData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const refundPayload = {
    paymentId: paymentData?.paymentID,
    refundAmount: Number(paymentData.amount).toFixed(2),
    trxId: trxID,
    sku: 'payment',
    reason: 'cashback',
  };
  console.log('refundPayload', refundPayload);

  const response = await axios.post(
    `${BKASH_BASE_URL}/tokenized/checkout/payment/refund`,
    refundPayload,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
        'x-app-key': APP_KEY,
      },
    },
  );

  console.log('response......', response);

  // Update payment status if refund is successful
  if (response.data.refundTransactionStatus === 'Completed') {
    await Payment.findOneAndUpdate(
      { trxID },
      { isRefund: true },
      { new: true },
    );
  }

  return response.data;
};

export const BkashService = {
  getValidToken,
  generateNewToken,
  useRefreshToken,
  createPayment,
  callbackPayment,
  queryPayment,
  refundPayment,
};
