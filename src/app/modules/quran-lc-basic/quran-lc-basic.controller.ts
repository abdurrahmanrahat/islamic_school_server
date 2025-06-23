import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BkashService } from '../bkash/bkash.service';
import { QuranLCBasicServices } from './quran-lc-basic.service';

const createQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.createQuranLCBasicIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student registered Quran LC Basic successfully',
    data: result,
  });
});

const getAllQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.getQuranLCBasicsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students retrieved successfully',
    data: result,
  });
});

const getSingleQuranLCBasic = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result =
      await QuranLCBasicServices.getSingleQuranLCBasicFromDb(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student details retrieved successfully',
      data: result,
    });
  },
);

const updateQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.updateQuranLCBasicIntoDb(
    req.params.studentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student details updated successfully',
    data: result,
  });
});

const deleteQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.deleteQuranLCBasicIntoDb(
    req.params.studentId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student removed successfully',
    data: result,
  });
});

// payment api
const createQuranLCBasicPayment = catchAsync(
  async (req: Request, res: Response) => {
    const {
      amount,
      orderId,
      paymentForId,
      paymentSuccessURL,
      paymentFailedURL,
    } = req.body;

    const callbackUrl = `${config.backed_live_url}/quran-lc-basic/payment/callback`;

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
      message: 'Quran lC basic payment initiated successfully',
      data: result,
    });
  },
);

const quranLCBasicCallback = catchAsync(async (req: Request, res: Response) => {
  const {
    paymentID,
    status,
    paymentForId,
    paymentSuccessURL,
    paymentFailedURL,
    amount,
  } = req.query;
  console.log('amount', amount);

  if (!paymentID) {
    return res.redirect(`${paymentFailedURL}`); // Redirect to fail page
  }

  if (status !== 'success') {
    return res.redirect(`${paymentFailedURL}`); // Redirect if payment failed
  }

  const result = await BkashService.callbackPayment(paymentID as string);

  if (result && result.paymentID) {
    // do database action here for success
    await QuranLCBasicServices.quranLCBasicStatusUpdateIntoDb(
      paymentForId as string,
      'success',
    );

    return res.redirect(`${paymentSuccessURL}`); // ✅ Redirect to success page
  } else {
    return res.redirect(`${paymentFailedURL}`); // Redirect if execution fails
  }
});

export const QuranLCBasicControllers = {
  createQuranLCBasic,
  getAllQuranLCBasic,
  getSingleQuranLCBasic,
  updateQuranLCBasic,
  deleteQuranLCBasic,
  createQuranLCBasicPayment,
  quranLCBasicCallback,
};
