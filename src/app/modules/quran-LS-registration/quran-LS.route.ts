import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { QuranLSUserControllers } from './quran-LS.controller';
import { QuranLSUserValidations } from './quran-LS.validation';

const router = express.Router();

router.post(
  '/create-quran-ls-registration',
  ValidateRequest(QuranLSUserValidations.createQuranLSUserValidationSchema),
  QuranLSUserControllers.createQuranLSUser,
);

router.get('/', QuranLSUserControllers.getAllQuranLSUsers);

router.patch(
  '/:studentId',
  ValidateRequest(QuranLSUserValidations.updateQuranLSUserValidationSchema),
  QuranLSUserControllers.updateQuranLSUser,
);

router.delete('/:studentId', QuranLSUserControllers.deleteQuranLSUser);

// router.get('/download-pdf', QuranLSUserControllers.makePDFQuranLSUser);

export const QuranLSUserRoutes = router;
