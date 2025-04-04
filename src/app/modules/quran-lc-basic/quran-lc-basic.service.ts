import QueryBuilder from '../../builder/QueryBuilder';
import { quranLCBasicSearchableFields } from './quran-lc-basic.constant';
import { TQuranLCBasic } from './quran-lc-basic.interface';
import { QuranLCBasic } from './quran-lc-basic.model';

const createQuranLCBasicIntoDb = async (quranLCBasicInfo: TQuranLCBasic) => {
  const result = await QuranLCBasic.create(quranLCBasicInfo);
  return result;
};

const getQuranLCBasicsFromDb = async (query: Record<string, unknown>) => {
  const quranLCBasicQuery = new QueryBuilder(QuranLCBasic.find(), query)
    .search(quranLCBasicSearchableFields)
    .filter();
  // .pagination();

  const data = await quranLCBasicQuery.modelQuery;

  // for count document except pagination.
  const quranLCBasicQueryWithoutPagination = new QueryBuilder(
    QuranLCBasic.find(),
    query,
  )
    .search(quranLCBasicSearchableFields)
    .filter();

  const document = await quranLCBasicQueryWithoutPagination.modelQuery;
  const totalCount = document?.length;
  return { data, totalCount };
};

const getSingleQuranLCBasicFromDb = async (studentId: string) => {
  const result = await QuranLCBasic.findOne({ _id: studentId });
  return result;
};

const updateQuranLCBasicIntoDb = async (
  studentId: string,
  body: Partial<TQuranLCBasic>,
) => {
  const result = await QuranLCBasic.findOneAndUpdate({ _id: studentId }, body, {
    new: true,
  });
  return result;
};

const deleteQuranLCBasicIntoDb = async (studentId: string) => {
  const result = await QuranLCBasic.findByIdAndDelete({ _id: studentId });
  return result;
};

export const QuranLCBasicServices = {
  createQuranLCBasicIntoDb,
  getQuranLCBasicsFromDb,
  getSingleQuranLCBasicFromDb,
  updateQuranLCBasicIntoDb,
  deleteQuranLCBasicIntoDb,
};
