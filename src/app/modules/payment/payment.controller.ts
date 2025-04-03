import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentInfo = req.body;
  const result = await PaymentServices.createPaymentIntoDb(paymentInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment created successfully',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.getPaymentsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All payments retrieved successfully',
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentID } = req.params;
  const result = await PaymentServices.getSinglePaymentFromDb(paymentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentID } = req.params;
  const result = await PaymentServices.updatePaymentIntoDb(paymentID, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment updated successfully',
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentID } = req.params;
  const result = await PaymentServices.deletePaymentIntoDb(paymentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment deleted successfully',
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
