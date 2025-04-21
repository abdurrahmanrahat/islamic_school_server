import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    blogTitle: z.string().min(1, 'Blog title is required'),
    blogImage: z.string().min(1, { message: 'Blog image is required' }),
    blogDescription: z.string().min(1, 'Blog description is required'),
    blogTags: z.array(z.string()).min(1, 'At least one tag is required'),
    authorDetails: z.string(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    blogTitle: z.string().min(1, 'Blog title is required').optional(),
    blogImage: z
      .string()
      .min(1, { message: 'Blog image is required' })
      .optional(),
    blogDescription: z
      .string()
      .min(1, 'Blog description is required')
      .optional(),
    blogTags: z
      .array(z.string())
      .min(1, 'At least one tag is required')
      .optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
