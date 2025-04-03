import QueryBuilder from '../../builder/QueryBuilder';
import { paymentSearchableFields } from './payment.constant';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';

const createPaymentIntoDb = async (paymentInfo: TPayment) => {
  return await Payment.create(paymentInfo);
};

const getPaymentsFromDb = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(Payment.find(), query)
    .search(paymentSearchableFields)
    .filter()
    .pagination();

  const data = await paymentQuery.modelQuery.sort({ createdAt: -1 });

  // for count document except pagination.
  const paymentQueryWithoutPagination = new QueryBuilder(Payment.find(), query)
    .search(paymentSearchableFields)
    .filter();

  const document = await paymentQueryWithoutPagination.modelQuery;
  const totalCount = document?.length;

  return { data, totalCount };
};

const getSinglePaymentFromDb = async (paymentID: string) => {
  return await Payment.findOne({ paymentID });
};

const updatePaymentIntoDb = async (
  paymentID: string,
  body: Partial<TPayment>,
) => {
  return await Payment.findOneAndUpdate({ paymentID }, body, { new: true });
};

const deletePaymentIntoDb = async (paymentID: string) => {
  return await Payment.findOneAndDelete({ paymentID });
};

export const PaymentServices = {
  createPaymentIntoDb,
  getPaymentsFromDb,
  getSinglePaymentFromDb,
  updatePaymentIntoDb,
  deletePaymentIntoDb,
};
