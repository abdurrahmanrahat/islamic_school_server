import { model, Schema } from 'mongoose';
import { TCourse } from './course.interface';

const CourseSchema = new Schema<TCourse>(
  {
    courseTitle: {
      type: String,
      required: [true, 'Course title is required'],
      minlength: 1,
    },
    courseImage: {
      type: String,
      required: [true, 'Course image is required'],
    },
    courseIntroVideo: {
      type: String,
      required: [true, 'Course intro video is required'],
    },
    coursePrice: {
      type: String,
      required: [true, 'Course price is required'],
    },
    courseShortDescription: {
      type: String,
      required: [true, 'Course short description is required'],
      minlength: 1,
    },
    courseDescription: {
      type: String,
      required: [true, 'Course description is required'],
      minlength: 1,
    },
    courseTags: {
      type: [String],
      required: [true, 'Course tags are required'],
      validate: [
        (val: string[]) => val.length > 0,
        'At least one tag is required',
      ],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalEnrolledStudents: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Course = model<TCourse>('Course', CourseSchema);
