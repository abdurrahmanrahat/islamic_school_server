import { z } from 'zod';

const createFaqValidationSchema = z.object({
  body: z.object({
    faqTitle: z.string().min(1, 'FAQ title is required'),
    faqDescription: z.string().min(1, 'FAQ description is required'),
    faqTags: z.array(z.string()).min(1, 'At least one tag is required'),
    authorDetails: z.string().min(1, 'Author details are required'),
  }),
});

const updateFaqValidationSchema = z.object({
  body: z.object({
    faqTitle: z.string().min(1, 'FAQ title is required').optional(),
    faqDescription: z.string().min(1, 'FAQ description is required').optional(),
    faqTags: z
      .array(z.string())
      .min(1, 'At least one tag is required')
      .optional(),
  }),
});

export const FaqValidations = {
  createFaqValidationSchema,
  updateFaqValidationSchema,
};
