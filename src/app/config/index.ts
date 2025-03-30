import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  bkash_checkout_username: process.env.BKASH_CHECKOUT_USERNAME,
  bkash_checkout_password: process.env.BKASH_CHECKOUT_PASSWORD,
  bkash_checkout_app_key: process.env.BKASH_CHECKOUT_APP_KEY,
  bkash_checkout_app_secret: process.env.BKASH_CHECKOUT_APP_SECRET,
  bkash_checkout_base_url: process.env.BKASH_CHECKOUT_BASE_URL,
  nogod_base_url: process.env.NAGAD_BASE_URL,
  nogod_merchant_id: process.env.NAGAD_MERCHANT_ID,
  nogod_merchant_secret: process.env.NAGAD_MERCHANT_SECRET,
  nogod_callback_url: process.env.NAGAD_CALLBACK_URL,
};
