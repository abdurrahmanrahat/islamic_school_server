import express from 'express';
import { auth } from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { USER_ROLE } from '../user/user.constant';
import { EnrolledCourseControllers } from './enrolled-course.controller';
import { EnrolledCourseValidations } from './enrolled-course.validation';

const router = express.Router();

// Route to create an enrolled course
router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.user),
  ValidateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

// Route to get all enrolled courses
router.get('/', EnrolledCourseControllers.getAllEnrolledCourses);
router.get(
  '/email/:studentEmail',
  EnrolledCourseControllers.getAllEnrolledCoursesByEmail,
);

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
  auth(USER_ROLE.admin),
  EnrolledCourseControllers.deleteEnrolledCourse,
);

// Route to create payment for enrolled live course
router.post(
  '/payment',
  EnrolledCourseControllers.createEnrolledLiveCoursePayment,
);
router.get(
  '/payment/callback',
  EnrolledCourseControllers.enrolledLiveCourseCallback,
);

export const EnrolledCourseRoutes = router;
