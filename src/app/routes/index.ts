import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BkashRoutes } from '../modules/bkash/bkash.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { CourseRoutes } from '../modules/course/course.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { QuranLSUserRoutes } from '../modules/quran-LS-registration/quran-LS.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

// router.use('/users', UserRoutes);

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/quran-ls-registration',
    route: QuranLSUserRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/bkash',
    route: BkashRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
