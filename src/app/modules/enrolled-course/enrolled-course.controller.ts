import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BkashService } from '../bkash/bkash.service';
import { EnrolledCourseServices } from './enrolled-course.service';

const createEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const courseInfo = req.body;

  const result =
    await EnrolledCourseServices.createEnrolledCourseIntoDb(courseInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Enrolled course created successfully',
    data: result,
  });
});

const getAllEnrolledCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { courseType, ...restQuery } = req.query;

    // Force courseType to string if it's a single value
    const finalCourseType =
      typeof courseType === 'string' ? courseType : undefined;

    const result = await EnrolledCourseServices.getEnrolledCoursesFromDb(
      finalCourseType,
      restQuery,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All enrolled courses retrieved successfully',
      data: result,
    });
  },
);

const getAllEnrolledCoursesByEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { studentEmail } = req.params;
    const { courseType, ...restQuery } = req.query;

    // Force courseType to string if it's a single value
    const finalCourseType =
      typeof courseType === 'string' ? courseType : undefined;

    const result = await EnrolledCourseServices.getEnrolledCoursesByEmailFromDb(
      studentEmail,
      finalCourseType,
      restQuery,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All enrolled courses retrieved successfully',
      data: result,
    });
  },
);

const getSingleEnrolledCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { enrolledCourseId } = req.params;

    const result =
      await EnrolledCourseServices.getSingleEnrolledCourseFromDb(
        enrolledCourseId,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single enrolled course retrieved successfully',
      data: result,
    });
  },
);

const updateEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const { enrolledCourseId } = req.params;

  const result = await EnrolledCourseServices.updateEnrolledCourseIntoDb(
    enrolledCourseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course updated successfully',
    data: result,
  });
});

const deleteEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const { enrolledCourseId } = req.params;

  const result =
    await EnrolledCourseServices.deleteEnrolledCourseFromDb(enrolledCourseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course deleted successfully',
    data: result,
  });
});

// payment api
const createEnrolledLiveCoursePayment = catchAsync(
  async (req: Request, res: Response) => {
    const {
      amount,
      orderId,
      paymentForId,
      paymentSuccessURL,
      paymentFailedURL,
    } = req.body;

    const callbackUrl = `${config.backed_live_url}/enrolled-courses/payment/callback`;

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
      message: 'Enrolled course payment initiated successfully',
      data: result,
    });
  },
);

const enrolledLiveCourseCallback = catchAsync(
  async (req: Request, res: Response) => {
    const {
      paymentID,
      status,
      paymentForId,
      paymentSuccessURL,
      paymentFailedURL,
      amount,
    } = req.query;

    if (!paymentID) {
      return res.redirect(`${paymentFailedURL}`); // Redirect to fail page
    }

    if (status !== 'success') {
      return res.redirect(`${paymentFailedURL}`); // Redirect if payment failed
    }

    const result = await BkashService.callbackPayment(paymentID as string);

    if (result && result.paymentID) {
      // do database action here for success
      await EnrolledCourseServices.enrolledLiveCourseStatusPropertiesUpdateIntoDb(
        paymentForId as string,
        Number(amount),
        paymentID as string,
      );

      return res.redirect(`${paymentSuccessURL}`); // ✅ Redirect to success page
    } else {
      return res.redirect(`${paymentFailedURL}`); // Redirect if execution fails
    }
  },
);

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getAllEnrolledCoursesByEmail,
  getSingleEnrolledCourse,
  updateEnrolledCourse,
  deleteEnrolledCourse,
  createEnrolledLiveCoursePayment,
  enrolledLiveCourseCallback,
};
