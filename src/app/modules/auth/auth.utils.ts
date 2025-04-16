import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const createJwtToken = (
  jwtPayload: { email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const googleClient = () => {
  const GOOGLE_CLIENT_ID = config.google_oauth_client_id;
  const GOOGLE_CLIENT_SECRET = config.google_oauth_client_secret;

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  return oauth2Client;
};
