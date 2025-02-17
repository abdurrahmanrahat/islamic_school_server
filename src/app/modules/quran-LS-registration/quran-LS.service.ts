import QueryBuilder from '../../builder/QueryBuilder';
import { quranLSUserSearchableFields } from './quran-LS.constant';
import { TQuranLSUser } from './quran-LS.interface';
import { QuranLSUser } from './quran-LS.model';

// post
const createQuranLSUserIntoDb = async (userInfo: TQuranLSUser) => {
  const result = await QuranLSUser.create(userInfo);
  return result;
};

// get
const getQuranLSUsersFromDb = async (query: Record<string, unknown>) => {
  const quranLSUserQuery = new QueryBuilder(QuranLSUser.find(), query)
    .search(quranLSUserSearchableFields)
    .filter();

  const data = await quranLSUserQuery.modelQuery;

  const document = await QuranLSUser.find();
  const totalCount = document?.length;
  return { data, totalCount };
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

// delete
const deleteQuranLSUserIntoDb = async (studentId: string) => {
  const result = await QuranLSUser.findByIdAndDelete({ _id: studentId });
  return result;
};

export const QuranLSUserServices = {
  createQuranLSUserIntoDb,
  getQuranLSUsersFromDb,
  updateQuranLSUsersIntoDb,
  deleteQuranLSUserIntoDb,
};
