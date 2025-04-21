import { Types } from 'mongoose';

export type TFaq = {
  faqTitle: string;
  faqDescription: string;
  faqTags: string[];
  authorDetails: Types.ObjectId;
  isDeleted?: boolean;
};
