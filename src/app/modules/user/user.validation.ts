import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
