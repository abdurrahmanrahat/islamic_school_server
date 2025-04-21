import { model, Schema } from 'mongoose';
import { TFaq } from './faq.interface';

const FaqSchema = new Schema<TFaq>(
  {
    faqTitle: {
      type: String,
      required: [true, 'FAQ title is required'],
      minlength: 1,
    },
    faqDescription: {
      type: String,
      required: [true, 'FAQ description is required'],
      minlength: 1,
    },
    faqTags: {
      type: [String],
      required: [true, 'FAQ tags are required'],
      validate: [
        (val: string[]) => val.length > 0,
        'At least one tag is required',
      ],
    },
    authorDetails: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author details are required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Faq = model<TFaq>('Faq', FaqSchema);
