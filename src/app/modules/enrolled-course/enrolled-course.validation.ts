import { z } from 'zod';

const feeHistoryItemSchema = z.object({
  amount: z.number({ required_error: 'Amount is required' }),
  date: z.string().min(1, 'Date is required'),
  paymentID: z.string().min(1, 'PaymentID is required'),
});

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required'),
    course: z.string().min(1, 'Course ID is required'),
    batchNo: z.string().min(1, 'Batch no is required'),
    // totalCourseFeePaid: z.number().optional(),
    // courseFeeHistory: z.array(feeHistoryItemSchema).optional(),
    // paymentStatus: z
    //   .enum(['pending', 'in-progress', 'completed'])
    //   .optional(),
  }),
});

const updateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1).optional(),
    course: z.string().min(1).optional(),
    batchNo: z.string().min(1).optional(),
    totalCourseFeePaid: z.number().optional(),
    courseFeeHistory: z.array(feeHistoryItemSchema).optional(),
    paymentStatus: z.enum(['pending', 'in-progress', 'completed']).optional(),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationSchema,
  updateEnrolledCourseValidationSchema,
};
