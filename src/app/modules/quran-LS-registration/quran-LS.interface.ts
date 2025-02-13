export type TQuranLSUser = {
  userName: string;
  userEmail: string;
  userGender: 'male' | 'female';
  dateOfBirth: string;
  profession: string;
  address: string;
  phoneNumber: string;
  whatsAppNumber: string;
  batchNo: 'quran-LS-2';
  paymentMethod: string;
  RegFeeNumber: string;
  status: 'default' | 'completed' | 'waiting';
};

// LS = learning session
