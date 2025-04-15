import { ObjectId } from 'mongoose';

export type TCourse = {
  courseTitle: string;
  courseImage: string;
  courseIntroVideo: string;
  coursePrice: string;
  courseFeeMonthly: string;
  courseCurrentBatch: string;
  courseShortDescription: string;
  courseDescription: string;
  courseTags: string[];
  courseInstructors: ObjectId[];
  courseWhatsAppGroupLinkBoys: string;
  courseWhatsAppGroupLinkGirls: string;
  courseType: 'live' | 'recorded';
  isCourseOngoing: 'yes' | 'no';
  totalRatings?: number;
  averageRating?: number;
  totalEnrolledStudents?: number;
  isDeleted?: boolean;
};
