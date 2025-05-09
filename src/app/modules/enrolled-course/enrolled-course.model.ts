import { model, Schema } from 'mongoose';
import { TEnrolledCourse } from './enrolled-course.interface';

const EnrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    batchNo: {
      type: String,
      required: [true, 'Batch no is required'],
    },
    totalCourseFeePaid: {
      type: Number,
      default: 0,
    },
    courseFeeHistory: {
      type: [
        {
          amount: {
            type: Number,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
          paymentID: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  EnrolledCourseSchema,
);
