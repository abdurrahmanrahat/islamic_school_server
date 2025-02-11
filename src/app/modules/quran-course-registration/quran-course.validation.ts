import { z } from 'zod';

const createQuranCourseUserValidationSchema = z.object({
  body: z.object({
    userName: z.string().min(2, 'Name must be at least 2 characters long'),
    userEmail: z.string().email('Invalid email format'),
    userGender: z.enum(['male', 'female']),
    dateOfBirth: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
    profession: z.string(),
    address: z.string(),
    phoneNumber: z.string().min(11, 'Phone number must be at least 11 digits'),
    whatsAppNumber: z
      .string()
      .min(11, 'WhatsApp number must be at least 11 digits'),
  }),
});

export const QuranCourseUserValidations = {
  createQuranCourseUserValidationSchema,
};
