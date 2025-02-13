import { TQuranLSUser } from './quran-LS.interface';
import { QuranLSUser } from './quran-LS.model';

// post
const createQuranLSUserIntoDb = async (userInfo: TQuranLSUser) => {
  const result = await QuranLSUser.create(userInfo);
  return result;
};

// get
const getQuranLSUsersFromDb = async () => {
  const result = await QuranLSUser.find();
  return result;
};

// update
const updateQuranLSUsersIntoDb = async (
  studentId: string,
  body: Partial<TQuranLSUser>,
) => {
  const result = await QuranLSUser.findOneAndUpdate({ _id: studentId }, body, {
    new: true,
  });

  return result;
};

export const QuranLSUserServices = {
  createQuranLSUserIntoDb,
  getQuranLSUsersFromDb,
  updateQuranLSUsersIntoDb,
};
