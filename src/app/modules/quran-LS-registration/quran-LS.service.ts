import { TQuranLSUser } from './quran-LS.interface';
import { QuranLSUser } from './quran-LS.model';

// post
const createQuranLSUserIntoDb = async (userInfo: TQuranLSUser) => {
  const result = await QuranLSUser.create(userInfo);
  return result;
};

export const QuranLSUserServices = {
  createQuranLSUserIntoDb,
};
