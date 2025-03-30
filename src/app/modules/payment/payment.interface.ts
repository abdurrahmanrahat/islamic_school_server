export type TPayment = {
  userID: string;
  amount: number;
  trxID: string;
  paymentMethod: 'bkash' | 'nagad';
  status?: 'Pending' | 'Completed' | 'Failed'; // Add other status types if needed
  callBackUrl?: string;
};
