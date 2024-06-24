import config from '../../config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createJwtToken } from './auth.utils';

// post
const loginUserIntoDb = async (payload: TLoginUser) => {
  // check if user already exists or not
  const existingUser = await UserModel.isUserExistsByEmail(payload.email);
  if (!existingUser) {
    throw new Error('Invalid email');
  }

  // compare hashed password
  const isPasswordValid = await UserModel.isPasswordMatched(
    payload.password,
    existingUser.password,
  );
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const jwtPayload = { email: existingUser?.email };
  const token = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return token;
};

export const AuthServices = {
  loginUserIntoDb,
};
