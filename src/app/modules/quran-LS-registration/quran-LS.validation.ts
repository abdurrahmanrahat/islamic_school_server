import { z } from 'zod';

const createQuranLSUserValidationSchema = z.object({
  body: z.object({
    userName: z.string().min(2, 'Name must be at least 2 characters long'),
    userEmail: z.string().email('Invalid email format'),
    userGender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    profession: z.string(),
    address: z.string(),
    phoneNumber: z.string().min(11, 'Phone number must be at least 11 digits'),
    whatsAppNumber: z
      .string()
      .min(11, 'WhatsApp number must be at least 11 digits'),
  }),
});

export const QuranLSUserValidations = {
  createQuranLSUserValidationSchema,
};
