import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
  }),
});

const userDetailsSchema = z.object({
  name: z.string().optional(),
  position: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  education: z.string().optional(),
  photoURL: z.string().optional(),
  whatsAppNumber: z.string().optional(),
  profession: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(['user', 'instructor', 'admin']).optional(),
    isRequestPending: z.boolean().optional(),
    details: userDetailsSchema.optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
