import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Course } from '../course/course.model';
import { enrolledCourseSearchableFields } from './enrolled-course.constant';
import { TEnrolledCourse } from './enrolled-course.interface';
import { EnrolledCourse } from './enrolled-course.model';

const createEnrolledCourseIntoDb = async (payload: TEnrolledCourse) => {
  const course = await Course.findOne({ _id: payload.course });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!');
  }

  const session = await EnrolledCourse.startSession();

  try {
    session.startTransaction();

    const enrolledCourse = await EnrolledCourse.create([payload], { session });

    const enrolledCourseCount = await EnrolledCourse.countDocuments({
      course: course._id,
    }).session(session);

    await Course.updateOne(
      { _id: course._id },
      { totalEnrolledStudents: enrolledCourseCount },
      { session },
    );

    await session.commitTransaction();

    return enrolledCourse[0];
  } catch (error) {
    await session.abortTransaction();
  }

  session.endSession();
};

const getEnrolledCoursesFromDb = async (query: Record<string, unknown>) => {
  const enrolledQuery = new QueryBuilder(EnrolledCourse.find(), query)
    .search(enrolledCourseSearchableFields)
    .filter();
  // .pagination();

  const data = await enrolledQuery.modelQuery
    .sort({ createdAt: -1 })
    .populate({
      path: 'user',
      select: '-password', // exclude password
    })
    .populate({
      path: 'course',
      populate: {
        path: 'courseInstructors',
        select: 'name details', // select specific fields from user
      },
    });

  const enrolledQueryWithoutPagination = new QueryBuilder(
    EnrolledCourse.find(),
    query,
  )
    .search(enrolledCourseSearchableFields)
    .filter();

  const document = await enrolledQueryWithoutPagination.modelQuery;
  const totalCount = document?.length;

  return { data, totalCount };
};

const getSingleEnrolledCourseFromDb = async (enrolledCourseId: string) => {
  const result = await EnrolledCourse.findOne({ _id: enrolledCourseId })
    .populate({
      path: 'user',
      select: '-password', // exclude password
    })
    .populate({
      path: 'course',
      populate: {
        path: 'courseInstructors',
        select: 'name details', // select specific fields from user
      },
    });
  return result;
};

const updateEnrolledCourseIntoDb = async (
  enrolledCourseId: string,
  body: Partial<TEnrolledCourse>,
) => {
  const result = await EnrolledCourse.findOneAndUpdate(
    { _id: enrolledCourseId },
    body,
    { new: true },
  );
  return result;
};

const deleteEnrolledCourseFromDb = async (enrolledCourseId: string) => {
  const session = await EnrolledCourse.startSession();

  try {
    session.startTransaction();

    // Step 1: Find the enrolled course to get the course ID
    const enrolledCourse =
      await EnrolledCourse.findById(enrolledCourseId).session(session);

    if (!enrolledCourse) {
      throw new AppError(httpStatus.NOT_FOUND, 'Enrolled course not found!');
    }

    // Step 2: Delete the enrolled course
    await EnrolledCourse.findByIdAndDelete(enrolledCourseId).session(session);

    // Step 3: Recalculate total enrolled students for the course
    const enrolledCourseCount = await EnrolledCourse.countDocuments({
      course: enrolledCourse.course,
    }).session(session);

    await Course.updateOne(
      { _id: enrolledCourse.course },
      { totalEnrolledStudents: enrolledCourseCount },
      { session },
    );

    await session.commitTransaction();

    return enrolledCourse;
  } catch (error) {
    await session.abortTransaction();
  }

  session.endSession();
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDb,
  getEnrolledCoursesFromDb,
  getSingleEnrolledCourseFromDb,
  updateEnrolledCourseIntoDb,
  deleteEnrolledCourseFromDb,
};
