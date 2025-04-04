import { z } from 'zod';

const createQuranLCBasicValidationSchema = z.object({
  body: z.object({
    studentName: z.string().min(1, 'Student name is required'),
    studentEmail: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required'),
    studentGender: z
      .string()
      .min(1, 'Gender is required')
      .refine((val) => ['male', 'female'].includes(val), {
        message: 'Gender must be either male or female',
      }),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    profession: z.string().min(1, 'Profession is required'),
    address: z.string().min(1, 'Address is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    whatsAppNumber: z.string().min(1, 'WhatsApp number is required'),
    batchNo: z.string().min(1, 'Batch no is required'),
    paymentStatus: z.enum(['pending', 'success', 'cancel']).optional(),
  }),
});

const updateQuranLCBasicValidationSchema = z.object({
  body: z.object({
    studentName: z.string().optional(),
    studentEmail: z.string().email('Invalid email format').optional(),
    studentGender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    whatsAppNumber: z.string().optional(),
    batchNo: z.string().min(1, 'Batch no is required').optional(),
    paymentStatus: z.enum(['pending', 'success', 'cancel']).optional(),
  }),
});

export const QuranLCBasicValidations = {
  createQuranLCBasicValidationSchema,
  updateQuranLCBasicValidationSchema,
};
