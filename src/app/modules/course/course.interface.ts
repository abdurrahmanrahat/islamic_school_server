export type TCourse = {
  courseTitle: string;
  courseImage: string;
  courseIntroVideo: string;
  coursePrice: string;
  courseShortDescription: string;
  courseDescription: string;
  courseTags: string[];
  totalRatings?: number;
  averageRating?: number;
  totalEnrolledStudents?: number;
  isDeleted?: boolean;
};
