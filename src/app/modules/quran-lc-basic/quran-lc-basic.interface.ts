export type TQuranLCBasic = {
  studentName: string;
  studentEmail: string;
  studentGender: string;
  dateOfBirth: string;
  profession: string;
  address: string;
  phoneNumber: string;
  whatsAppNumber: string;
  batchNo: string;
  paymentStatus?: 'pending' | 'success' | 'cancel';
  isDeleted?: boolean;
};
