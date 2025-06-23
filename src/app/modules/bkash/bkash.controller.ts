import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BkashService } from './bkash.service';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, orderId, paymentForId, paymentSuccessURL, paymentFailedURL } =
    req.body;

  const callbackUrl = `${config.backed_live_url}/bkash/callback`;

  const result = await BkashService.createPayment(
    amount,
    orderId,
    paymentForId,
    paymentSuccessURL,
    paymentFailedURL,
    callbackUrl,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bkash payment initiated successfully',
    data: result,
  });
});

const callbackPayment = catchAsync(async (req: Request, res: Response) => {
  const {
    paymentID,
    status,
    paymentForId,
    paymentSuccessURL,
    paymentFailedURL,
    amount,
  } = req.query;

  /**
{
  paymentID: 'TR0011Q0rCJb11743659089595',
  status: 'success',
  signature: '9pxIynjqiZ',
  apiVersion: '1.2.0-beta/'
}
  */

  if (!paymentID) {
    return res.redirect(`${paymentFailedURL}`); // ✅ Redirect to fail page
  }

  if (status !== 'success') {
    return res.redirect(`${paymentFailedURL}`); // ✅ Redirect if payment failed
  }

  const result = await BkashService.callbackPayment(paymentID as string);

  /**
  {
  paymentID: 'TR0011Q0rCJb11743659089595',
  trxID: 'CD35562C23',
  transactionStatus: 'Completed',
  amount: '1',
  currency: 'BDT',
  intent: 'sale',
  paymentExecuteTime: '2025-04-03T11:45:32:082 GMT+0600',
  merchantInvoiceNumber: 'INV-1234567',
  payerType: 'Customer',
  payerReference: '***',
  customerMsisdn: '01704345701',
  payerAccount: '01704345701',
  statusCode: '0000',
  statusMessage: 'Successful'
  }*/

  if (result && result.paymentID) {
    return res.redirect(
      `${paymentSuccessURL}?paymentForId=${paymentForId}&paymentID=${paymentID}&amount=${amount}`,
    ); // ✅ Redirect to success page
  } else {
    return res.redirect(`${paymentFailedURL}`); // ✅ Redirect if execution fails
  }
});

const queryPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentID } = req.params;

  const result = await BkashService.queryPayment(paymentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bkash payment status retrieved successfully',
    data: result,
  });
});

const refundPayment = catchAsync(async (req: Request, res: Response) => {
  const { trxID } = req.params;

  const result = await BkashService.refundPayment(trxID as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bkash payment refunded successfully',
    data: result,
  });
});

export const BkashController = {
  createPayment,
  callbackPayment,
  queryPayment,
  refundPayment,
};
