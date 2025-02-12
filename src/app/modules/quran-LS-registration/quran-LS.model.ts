import mongoose, { Schema } from 'mongoose';
import { TQuranLSUser } from './quran-LS.interface';

const QuranLSUserSchema = new Schema<TQuranLSUser>(
  {
    userName: { type: String, required: true, minlength: 2 },
    userEmail: { type: String, required: true },
    userGender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: {
      type: String,
      required: true,
    },
    profession: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, minlength: 11 },
    whatsAppNumber: { type: String, required: true, minlength: 11 },
    batchNo: { type: String, default: 'quran-LS-2' },
    paymentMethod: { type: String, required: true },
    RegFeeNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export const QuranLSUser = mongoose.model<TQuranLSUser>(
  'QuranLSUser',
  QuranLSUserSchema,
);
