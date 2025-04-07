import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    courseTitle: z.string().min(1, { message: 'Course title is required' }),
    courseImage: z.string().min(1, { message: 'Course image is required' }),
    courseIntroVideo: z
      .string()
      .min(1, { message: 'Course intro video is required' }),
    coursePrice: z.string().min(1, { message: 'Course fee is required' }),
    courseFeeMonthly: z
      .string()
      .min(1, { message: 'Course monthly fee is required' }),
    courseCurrentBatch: z
      .string()
      .min(1, { message: 'Course batch fee is required' }),
    courseShortDescription: z
      .string()
      .min(1, { message: 'Course short description is required' }),
    courseDescription: z
      .string()
      .min(1, { message: 'Course description is required' }),
    courseTags: z
      .array(z.string().min(1, { message: 'Tag cannot be empty' }))
      .min(1, { message: 'At least one tag is required' }),
    courseInstructors: z
      .array(z.string().min(1, { message: 'Instructor cannot be empty' }))
      .min(1, { message: 'At least one instructor is required' }),
    courseWhatsAppGroupLinkBoys: z
      .string()
      .min(1, { message: 'WhatsApp group link (boys) is required' }),
    courseWhatsAppGroupLinkGirls: z
      .string()
      .min(1, { message: 'WhatsApp group link (girls) is required' }),
    courseType: z.enum(['live', 'recorded'], {
      required_error: 'Course type is required',
    }),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    courseTitle: z
      .string()
      .min(1, { message: 'Course title is required' })
      .optional(),
    courseImage: z
      .string()
      .min(1, { message: 'Course image is required' })
      .optional(),
    courseIntroVideo: z
      .string()
      .min(1, { message: 'Course intro video is required' })
      .optional(),
    coursePrice: z
      .string()
      .min(1, { message: 'Course fee is required' })
      .optional(),
    courseFeeMonthly: z
      .string()
      .min(1, { message: 'Course monthly fee is required' })
      .optional(),
    courseCurrentBatch: z
      .string()
      .min(1, { message: 'Course batch is required' })
      .optional(),
    courseShortDescription: z
      .string()
      .min(1, { message: 'Course short description is required' })
      .optional(),
    courseDescription: z
      .string()
      .min(1, { message: 'Course description is required' })
      .optional(),
    courseTags: z
      .array(z.string().min(1, { message: 'Tag cannot be empty' }))
      .min(1, { message: 'At least one tag is required' })
      .optional(),
    courseInstructors: z
      .array(z.string().min(1, { message: 'Instructor cannot be empty' }))
      .min(1, { message: 'At least one instructor is required' })
      .optional(),
    courseWhatsAppGroupLinkBoys: z
      .string()
      .min(1, { message: 'WhatsApp group link (boys) is required' })
      .optional(),
    courseWhatsAppGroupLinkGirls: z
      .string()
      .min(1, { message: 'WhatsApp group link (girls) is required' })
      .optional(),
    courseType: z.enum(['live', 'recorded']).optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
