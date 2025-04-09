import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { EnrolledCourseControllers } from './enrolled-course.controller';
import { EnrolledCourseValidations } from './enrolled-course.validation';

const router = express.Router();

// Route to create an enrolled course
router.post(
  '/create-enrolled-course',
  ValidateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

// Route to get all enrolled courses
router.get('/', EnrolledCourseControllers.getAllEnrolledCourses);

// Route to get single enrolled course
router.get(
  '/:enrolledCourseId',
  EnrolledCourseControllers.getSingleEnrolledCourse,
);

// Route to update an enrolled course by ID
router.patch(
  '/:enrolledCourseId',
  ValidateRequest(
    EnrolledCourseValidations.updateEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourse,
);

// Route to delete an enrolled course by ID
router.delete(
  '/:enrolledCourseId',
  EnrolledCourseControllers.deleteEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
