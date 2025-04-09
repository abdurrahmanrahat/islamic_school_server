import QueryBuilder from '../../builder/QueryBuilder';
import { enrolledCourseSearchableFields } from './enrolled-course.constant';
import { TEnrolledCourse } from './enrolled-course.interface';
import { EnrolledCourse } from './enrolled-course.model';

const createEnrolledCourseIntoDb = async (payload: TEnrolledCourse) => {
  const result = await EnrolledCourse.create(payload);
  return result;
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
  const result = await EnrolledCourse.findByIdAndDelete(enrolledCourseId);
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDb,
  getEnrolledCoursesFromDb,
  getSingleEnrolledCourseFromDb,
  updateEnrolledCourseIntoDb,
  deleteEnrolledCourseFromDb,
};
