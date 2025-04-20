import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import { USER_ROLE } from '../modules/user/user.constant';
import { UserModel } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'Token not found!');
    }

    const verifiedToken = jwt.verify(token, config.jwt_access_secret as string);

    const { email, role } = verifiedToken as JwtPayload;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new AppError(401, 'User not found!');
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(
        403,
        'Forbidden! You are not allowed to access this route.',
      );
    }

    next();
  });
};
