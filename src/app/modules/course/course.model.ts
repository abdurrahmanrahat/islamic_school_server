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
    courseInstructors: {
      type: [String],
      required: [true, 'Course instructors are required'],
      validate: [
        (val: string[]) => val.length > 0,
        'At least one instructor is required',
      ],
    },
    courseWhatsAppGroupLinkBoys: {
      type: String,
      required: [true, 'Boys WhatsApp group link is required'],
    },
    courseWhatsAppGroupLinkGirls: {
      type: String,
      required: [true, 'Girls WhatsApp group link is required'],
    },
    courseType: {
      type: String,
      required: [true, 'Course type is required'],
      enum: ['live', 'recorded'],
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
