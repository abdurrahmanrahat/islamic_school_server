import { model, Schema } from 'mongoose';
import { TQuranLCBasic } from './quran-lc-basic.interface';

const QuranLCBasicSchema = new Schema<TQuranLCBasic>(
  {
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true, unique: true },
    studentGender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
    profession: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    whatsAppNumber: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'cancel'],
      default: 'pending',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const QuranLCBasic = model<TQuranLCBasic>(
  'QuranLCBasic',
  QuranLCBasicSchema,
);
