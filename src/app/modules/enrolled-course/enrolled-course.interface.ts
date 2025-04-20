import { ObjectId } from 'mongoose';

export type TEnrolledCourse = {
  user: ObjectId;
  course: ObjectId;
  batchNo: string;
  totalCourseFeePaid?: number;
  courseFeeHistory?: TEnrolledCourseFeeHistory[];
  paymentStatus?: 'pending' | 'in-progress' | 'completed';
  isDeleted?: boolean;
};

export type TEnrolledCourseFeeHistory = {
  amount: number;
  date: string;
  paymentID: string;
};
