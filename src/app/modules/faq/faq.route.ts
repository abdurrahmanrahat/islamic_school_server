import express from 'express';
import { auth } from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { USER_ROLE } from '../user/user.constant';
import { FaqControllers } from './faq.controller';
import { FaqValidations } from './faq.validation';

const router = express.Router();

// Route to create a FAQ
router.post(
  '/create-faq',
  auth(USER_ROLE.admin),
  ValidateRequest(FaqValidations.createFaqValidationSchema),
  FaqControllers.createFaq,
);

// Route to get all FAQs
router.get('/', FaqControllers.getAllFaqs);

// Route to get single FAQ
router.get('/:faqId', FaqControllers.getSingleFaq);

// Route to update a specific FAQ by ID
router.patch(
  '/:faqId',
  auth(USER_ROLE.admin),
  ValidateRequest(FaqValidations.updateFaqValidationSchema),
  FaqControllers.updateFaq,
);

// Route to delete a specific FAQ by ID
router.delete('/:faqId', auth(USER_ROLE.admin), FaqControllers.deleteFaq);

export const FaqRoutes = router;
