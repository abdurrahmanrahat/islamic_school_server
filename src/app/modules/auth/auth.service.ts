import config from '../../config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createJwtToken } from './auth.utils';

// post
const loginUserIntoDb = async (payload: TLoginUser) => {
  // check if user already exists or not
  const existingUser = await UserModel.isUserExistsByEmailOrNumber(
    payload.email,
  );
  if (!existingUser) {
    throw new Error('Invalid email or number');
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
  const jwtPayload = {
    name: existingUser.name,
    email: existingUser?.email,
    phone: existingUser.phone,
    role: existingUser.role,
  };
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
