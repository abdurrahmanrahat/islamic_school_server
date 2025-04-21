import QueryBuilder from '../../builder/QueryBuilder';
import { faqSearchableFields } from './faq.constant';
import { TFaq } from './faq.interface';
import { Faq } from './faq.model';

const createFaqIntoDb = async (faqInfo: TFaq) => {
  const result = await Faq.create(faqInfo);
  return result;
};

const getFaqsFromDb = async (query: Record<string, unknown>) => {
  const faqQuery = new QueryBuilder(Faq.find({ isDeleted: false }), query)
    .search(faqSearchableFields)
    .filter()
    .pagination();

  const data = await faqQuery.modelQuery
    .sort({ createdAt: -1 })
    .populate('authorDetails');

  // for count document except pagination
  const faqQueryWithoutPagination = new QueryBuilder(
    Faq.find({ isDeleted: false }),
    query,
  )
    .search(faqSearchableFields)
    .filter();

  const document = await faqQueryWithoutPagination.modelQuery;
  const totalCount = document?.length;
  return { data, totalCount };
};

const getSingleFaqFromDb = async (faqId: string) => {
  const result = await Faq.findOne({ _id: faqId, isDeleted: false }).populate(
    'authorDetails',
  );
  return result;
};

const updateFaqIntoDb = async (faqId: string, body: Partial<TFaq>) => {
  const result = await Faq.findOneAndUpdate({ _id: faqId }, body, {
    new: true,
  });
  return result;
};

const deleteFaqIntoDb = async (faqId: string) => {
  const result = await Faq.findByIdAndUpdate(
    faqId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const FaqServices = {
  createFaqIntoDb,
  getFaqsFromDb,
  getSingleFaqFromDb,
  updateFaqIntoDb,
  deleteFaqIntoDb,
};
