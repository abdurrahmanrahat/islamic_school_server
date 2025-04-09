import { ObjectId } from 'mongoose';

export type TEnrolledCourse = {
  user: ObjectId;
  course: ObjectId;
  totalCourseFeeGiven?: number;
  courseFeeHistory?: TEnrolledCourseFeeHistory[];
  paymentStatus?: 'pending' | 'in-progress' | 'completed';
};

export type TEnrolledCourseFeeHistory = {
  amount: number;
  date: string;
};
