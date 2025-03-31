import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const courseInfo = req.body;

  // Call the service function to create the course in the DB
  const result = await CourseServices.createCourseIntoDb(courseInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  // Fetch all courses from the database, passing any query params (e.g., pagination, search)
  const result = await CourseServices.getCoursesFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All courses retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const result = await CourseServices.getSingleCourseFromDb(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params; // Extract the courseId from the request params

  // Call the service to update the course by its ID
  const result = await CourseServices.updateCourseIntoDb(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params; // Extract the courseId from the request params

  // Call the service to delete the course by its ID
  const result = await CourseServices.deleteCourseIntoDb(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
