import express from 'express';
import { auth } from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

// Route to create a course
router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  ValidateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

// Route to get all courses
router.get('/', CourseControllers.getAllCourses);

// Route to get a single course by ID
router.get('/:courseId', CourseControllers.getSingleCourse);

// Route to update a specific course by ID
router.patch(
  '/:courseId',
  auth(USER_ROLE.admin),
  ValidateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// Route to delete a specific course by ID
router.delete(
  '/:courseId',
  auth(USER_ROLE.admin),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
