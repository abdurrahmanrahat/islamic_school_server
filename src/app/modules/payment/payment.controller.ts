import { Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, paymentMethod, userID, callBackUrl } = req.body;
  console.log('body', req.body);
  let paymentURL = '';

  if (paymentMethod === 'bkash') {
    console.log('hhhhhhh...');
    paymentURL = await PaymentServices.initiateBkashPayment(
      amount,
      userID,
      callBackUrl,
    );

    console.log('paymentURL', paymentURL);
  } else if (paymentMethod === 'nagad') {
    paymentURL = await PaymentServices.initiateNagadPayment(amount, userID);
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid payment method');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initiate successfully.',
    data: { paymentURL: paymentURL },
  });
});

const executePayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentID, paymentMethod, userID } = req.body;

  if (paymentMethod === 'bkash') {
    const paymentData = await PaymentServices.executeBkashPayment(
      paymentID,
      userID,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment successfully done.',
      data: paymentData,
    });
  } else {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Payment execution not supported',
    );
  }
});

export const PaymentControllers = {
  initiatePayment,
  executePayment,
};
