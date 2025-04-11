import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
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

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getAllEnrolledCoursesByEmail,
  getSingleEnrolledCourse,
  updateEnrolledCourse,
  deleteEnrolledCourse,
};
