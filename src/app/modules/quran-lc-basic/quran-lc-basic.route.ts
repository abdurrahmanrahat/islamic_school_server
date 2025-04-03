import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { QuranLCBasicControllers } from './quran-lc-basic.controller';
import { QuranLCBasicValidations } from './quran-lc-basic.validation';

const router = express.Router();

router.post(
  '/create-quran-lc-basic',
  ValidateRequest(QuranLCBasicValidations.createQuranLCBasicValidationSchema),
  QuranLCBasicControllers.createQuranLCBasic,
);

router.get('/', QuranLCBasicControllers.getAllQuranLCBasic);

router.get('/:studentId', QuranLCBasicControllers.getSingleQuranLCBasic);

router.patch(
  '/:studentId',
  ValidateRequest(QuranLCBasicValidations.updateQuranLCBasicValidationSchema),
  QuranLCBasicControllers.updateQuranLCBasic,
);

router.delete('/:studentId', QuranLCBasicControllers.deleteQuranLCBasic);

export const QuranLCBasicRoutes = router;
