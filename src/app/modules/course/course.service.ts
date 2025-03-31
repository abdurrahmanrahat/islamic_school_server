import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (courseInfo: TCourse) => {
  const result = await Course.create(courseInfo);
  return result;
};

const getCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(courseSearchableFields)
    .filter()
    .pagination();

  const data = await courseQuery.modelQuery.sort({ createdAt: -1 });

  // For counting total documents except pagination.
  const courseQueryWithoutPagination = new QueryBuilder(Course.find(), query)
    .search(courseSearchableFields)
    .filter();

  const document = await courseQueryWithoutPagination.modelQuery;
  const totalCount = document?.length;
  return { data, totalCount };
};

const getSingleCourseFromDb = async (courseId: string) => {
  const result = await Course.findOne({ _id: courseId });
  return result;
};

const updateCourseIntoDb = async (courseId: string, body: Partial<TCourse>) => {
  const result = await Course.findOneAndUpdate({ _id: courseId }, body, {
    new: true,
  });
  return result;
};

const deleteCourseIntoDb = async (courseId: string) => {
  const result = await Course.findByIdAndDelete({ _id: courseId });
  return result;
};

export const CourseServices = {
  createCourseIntoDb,
  getCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deleteCourseIntoDb,
};
