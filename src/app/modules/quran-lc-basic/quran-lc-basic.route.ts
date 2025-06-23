import express from 'express';
import { auth } from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { USER_ROLE } from '../user/user.constant';
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
  auth(USER_ROLE.admin, USER_ROLE.instructor, USER_ROLE.user),
  ValidateRequest(QuranLCBasicValidations.updateQuranLCBasicValidationSchema),
  QuranLCBasicControllers.updateQuranLCBasic,
);

router.delete(
  '/:studentId',
  auth(USER_ROLE.admin),
  QuranLCBasicControllers.deleteQuranLCBasic,
);

router.post('/payment', QuranLCBasicControllers.createQuranLCBasicPayment);
router.get('/payment/callback', QuranLCBasicControllers.quranLCBasicCallback);

export const QuranLCBasicRoutes = router;
