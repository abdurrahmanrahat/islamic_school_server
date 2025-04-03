import { Schema, model } from 'mongoose';
import { TBkashToken } from './bkash.interface';

const BkashTokenSchema = new Schema<TBkashToken>({
  grantToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  grantExpiresAt: { type: Date, required: true },
  refreshExpiresAt: { type: Date, required: true },
});

export const BkashToken = model<TBkashToken>('BkashToken', BkashTokenSchema);
