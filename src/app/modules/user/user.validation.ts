import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z
      .string()
      .max(10, { message: 'Password size maximum 10 characters.' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
