export type TCourse = {
  courseTitle: string;
  courseImage: string;
  courseIntroVideo: string;
  coursePrice: string;
  courseShortDescription: string;
  courseDescription: string;
  courseTags: string[];
  courseInstructors: string[];
  courseWhatsAppGroupLinkBoys: string;
  courseWhatsAppGroupLinkGirls: string;
  courseType: 'live' | 'recorded';
  totalRatings?: number;
  averageRating?: number;
  totalEnrolledStudents?: number;
  isDeleted?: boolean;
};
