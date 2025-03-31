import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    courseTitle: z.string().min(1, { message: 'Course title is required' }),
    courseImage: z.string().min(1, { message: 'Course image is required' }),
    courseIntroVideo: z
      .string()
      .min(1, { message: 'Course intro video is required' }),
    coursePrice: z.string().min(1, { message: 'Course price is required' }),
    courseShortDescription: z
      .string()
      .min(1, { message: 'Course short description is required' }),
    courseDescription: z
      .string()
      .min(1, { message: 'Course description is required' }),
    courseTags: z
      .array(z.string().min(1, { message: 'Tag cannot be empty' }))
      .min(1, { message: 'At least one tag is required' }),
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
      .min(1, { message: 'Course price is required' })
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
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
