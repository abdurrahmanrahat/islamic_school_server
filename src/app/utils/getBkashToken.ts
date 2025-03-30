import axios from 'axios';
import config from '../config';

const BKASH_BASE_URL = config.bkash_checkout_base_url;

export const getBkashToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${BKASH_BASE_URL}/checkout/token/grant`,
      {
        app_key: config.bkash_checkout_app_key,
        app_secret: config.bkash_checkout_app_secret,
      },
    );
    // 1 hour: store , use
    //

    if (response.data?.id_token) {
      return response.data.id_token;
    } else {
      console.error('⚠️ Error: bKash token response invalid', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting bKash token:', error);
    return null;
  }
};
