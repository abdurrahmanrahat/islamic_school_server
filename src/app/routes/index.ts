import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
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
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
