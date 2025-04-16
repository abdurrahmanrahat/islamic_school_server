import axios from 'axios';
import config from '../../config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createJwtToken, googleClient } from './auth.utils';

// post
const loginUserIntoDb = async (payload: TLoginUser) => {
  // check if user already exists or not
  const existingUser = await UserModel.isUserExistsByEmailOrNumber(
    payload.email,
  );
  if (!existingUser) {
    throw new Error('Invalid email address!');
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
  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return accessToken;
};

const googleLoginIntoDb = async (code: string) => {
  const oauth2Client = googleClient();
  const googleRes = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
  );
  const { name, email, picture } = userRes.data;

  const newUser = {
    name,
    email,
    phone: 'N/A',
    password: '111111',
    'details.photoURL': picture,
  };

  // check if user already exists or not
  const existingUser = await UserModel.isUserExistsByEmailOrNumber(email);

  let result;
  let firstTimeLoggedIn;

  if (!existingUser) {
    result = await UserModel.create(newUser);
    firstTimeLoggedIn = true;
  } else {
    result = existingUser;
    firstTimeLoggedIn = false;
  }

  // Generate JWT token
  const jwtPayload = {
    name: result.name,
    email: result.email,
    phone: result.phone,
    role: result.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken, firstTimeLoggedIn };
};

export const AuthServices = {
  loginUserIntoDb,
  googleLoginIntoDb,
};
