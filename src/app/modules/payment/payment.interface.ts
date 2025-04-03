export type TPayment = {
  paymentID: string;
  trxID: string;
  amount: string;
  paymentExecuteTime: string;
  payerAccount: string;
  isRefund?: boolean;
};
